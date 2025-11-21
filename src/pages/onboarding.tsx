import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BarLoader } from "react-spinners";

function Onboarding() {

  const { isLoaded, user } = useUser();
  const navigate = useNavigate()
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const navigateUser =(role: string)=>{
    navigate(role === 'recruiter' ? '/post-job' : '/jobs')
  }

  const handleRoleSelection = async (role: string) => {
    // Prevent double clicks
    if(loadingRole) return;

    setLoadingRole(role); // Start loading
    
    try {
      await user?.update({ unsafeMetadata: { role } });
      navigateUser(role);
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setLoadingRole(null); // Stop loading (if navigation fails)
    }
  };

  useEffect(() =>{
    if(user?.unsafeMetadata.role){
      navigateUser(user?.unsafeMetadata.role as string);
    }
  },[user])

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div className="flex flex-col items-center justify-center mt-32 z-10 relative">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
         {loadingRole === "candidate" ? "Updating..." : "Candidate"}
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          {loadingRole === "recruiter" ? "Updating..." : "Recruiter"}
        </Button>
      </div>
    </div>
  );
}

export default Onboarding;
