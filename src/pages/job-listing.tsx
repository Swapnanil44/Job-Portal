import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useSession, useUser } from "@clerk/clerk-react";
import { useEffect, useMemo } from "react";

function JobListing() {
  const fetchOptions = useMemo(() => ({}), []);
  

  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
    error
  } = useFetch(getJobs,fetchOptions);

  console.log(loadingJobs)
  console.log(dataJobs);
  console.log(error)
  const { isLoaded, isSignedIn } = useUser();
  
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fnJobs();
    }
  }, [isLoaded, isSignedIn,fnJobs]);

  return <div>JobListing</div>;
}

export default JobListing;
