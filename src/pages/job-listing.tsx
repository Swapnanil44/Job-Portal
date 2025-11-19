import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";
import { BarLoader } from "react-spinners";
import { State} from "country-state-city";

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

  const {
    fn: fnCompanies,
    data: companies,
  } = useFetch(getCompanies);

  console.log(loadingJobs);
  console.log(jobs);
  console.log(error);
  console.log(companies);
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fnCompanies();
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fnJobs();
    }
  }, [isLoaded, isSignedIn, fnJobs]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const query = formData.get("search-query");

    if (query) {
      setSearchQuery(query.toString());
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      <form
        onSubmit={handleSubmit}
        className="h-14 w-full flex flex-row justify-center gap-4 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search jobs by Title"
          name="search-query"
          className="h-full flex-1  px-4 text-md"
        />
        <Button variant={"blue"} type="submit" className="h-full sm:w-28">
          Search
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <Select  value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Companies" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies &&
                companies.map((company: any) => {
                  return (
                    <SelectItem key={company.name} value={company.id}>
                      {company.name}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={clearFilters}
          variant={"destructive"}
        >
          Clear Filters
        </Button>
      </div>

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
