import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Layout from "../../Layout";

export default function ProtectedRoute({ loading = <div>Loading...</div> }) {
  const isSignedIn = useAuth();
  if (isSignedIn === null) {
    return <Layout>{loading}</Layout>;
  }
  return isSignedIn ? <Outlet /> : <Navigate to="/" replace />;
}
