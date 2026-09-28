import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * RoleBasedRoute component that restricts access based on user role
 *
 * Usage:
 * <Route element={<RoleBasedRoute requiredRole="admin" />}>
 *   <Route path="/admin-page" element={<AdminPage />} />
 * </Route>
 *
 * @param {string} requiredRole - The required role to access the route ('user' or 'admin')
 */
export default function RoleBasedRoute({ requiredRole }) {
  const { isAuthenticated, loading, user } = useAuth();

  // Show nothing while auth state is being validated
  if (loading) {
    return null;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on their actual role
    if (user?.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    } else if (user?.role === "user") {
      return <Navigate to="/user-dashboard" replace />;
    }
    // If role doesn't match and not admin/user, show unauthorized

    // console log all user data
    /* console.log("User data:", user); */

    return <Navigate to="/unauthorized" replace />;
  }

  // Render nested routes
  return <Outlet />;
}
