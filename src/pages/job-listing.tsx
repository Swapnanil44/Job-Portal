import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";
import type { DiscoverBehavior } from "react-router";
import { BarLoader } from "react-spinners";

function JobListing() {
  // location,
  //   company_id,
  //   searchQuery,
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const fetchOptions = useMemo(
    () => ({ location, company_id, searchQuery }),
    [location, company_id, searchQuery]
  );

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
    error,
  } = useFetch(getJobs, fetchOptions);

  console.log(loadingJobs);
  console.log(jobs);
  console.log(error);
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fnJobs();
    }
  }, [isLoaded, isSignedIn, fnJobs]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job: any) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div> No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
}

export default JobListing;
