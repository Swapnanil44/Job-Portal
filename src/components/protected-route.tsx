import { useUser } from "@clerk/clerk-react";
import * as React from "react";
import { Navigate, useLocation } from "react-router";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const {isSignedIn, isLoaded, user} = useUser();
  const {pathName} = useLocation();
  
  if(isLoaded && !isSignedIn && isSignedIn !== undefined){
    return <Navigate to="/?sign-in=true"/>
  }
  return children
}

export default ProtectedRoute;
