import { Navigate } from 'react-router'

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (role !== 'admin' && role !== 'superadmin') {
    return <Navigate to="/home" replace />
  }

  return children
}

export default AdminRoute
