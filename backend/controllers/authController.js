//authController.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Token from "../models/accessToken.js";
import { Op } from "sequelize";

// Register User (POST)
export async function registerUser(req, res) {
  const { first_name, last_name, email, password } = req.body;
    const errors = [];
    if (!first_name || !last_name || !email || !password) {
        errors.push({ msg: "Please fill in all fields" });
    }
    if (password.length < 8) {
        errors.push({ msg: "Password should be at least 8 characters" });
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }],
            },
        });

        if (existingUser) {
            const conflicts = [];
            if (existingUser.email === email) {
                conflicts.push({ msg: "Email is already registered" });
            }
            return res.status(409).json({ errors: conflicts });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "User registered successfully",
            userId: newUser.id,
            email: newUser.email,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

// Login user (POST)
export async function loginUser(req, res) {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all fields" });
    }
    try {
        //check user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }   

        //generate JWT
        const expiresAt = new Date(Date.now() +  24 * 60 * 60 * 1000); //exp 1 day

        const token = jwt.sign(
            { userId: user.userId, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        //save to db
        await Token.create({
            userId: user.userId,
            token,
            expiresAt,
            revoked: false,
        });

        //respond in json
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.userId,
                email: user.email,
                role: user.role,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

// Logout user (POST)
export async function logoutUser(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        //revoke token in db
        const dbToken = await Token.findOne({ where: { token, revoked: false } });
        if (dbToken) {
            dbToken.revoked = true;
            await dbToken.save();
        }
        res.json({ message: "Logout successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}