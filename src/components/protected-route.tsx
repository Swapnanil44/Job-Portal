import { useUser } from "@clerk/clerk-react";
import * as React from "react";
import { Navigate, useLocation } from "react-router";
import { BarLoader } from "react-spinners";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname, search } = useLocation();

  // console.log(user);
  if (!isLoaded) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  if (
    search.includes("__clerk_db_jwt") ||
    search.includes("__clerk_handshake") ||
    search.includes("clerk_action")
  ) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }
  return children;
}

export default ProtectedRoute;
