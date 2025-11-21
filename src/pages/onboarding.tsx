import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { BarLoader } from "react-spinners";

function Onboarding() {

  const { isLoaded, user } = useUser();
  const navigate = useNavigate()

  const navigareUser =(role: string)=>{
    navigate(role === 'recruiter' ? '/post-job' : '/jobs')
  }
  const handleRoleSelection = async (role: string) =>{
    await user?.update({unsafeMetadata: {role}}).then(() => {
      navigareUser(role)
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() =>{
    if(user?.unsafeMetadata.role){
      navigareUser(user?.unsafeMetadata.role as string);
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
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
}

export default Onboarding;
