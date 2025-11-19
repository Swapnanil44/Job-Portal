import supabaseClient from "@/utils/supabase";

export async function getJobs(
  token: string,
  {
    location,
    company_id,
    searchQuery,
  }: { location?: string; company_id?: string; searchQuery?: string }
) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url), saved: saved_jobs(id)");
  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }
  const { data, error } = await query;

  if (error) {
    console.log("Error fetching jobs: ", error);
    throw new Error(error.message);
  }

  return data;
}

export async function saveJob(
  token: string,
  options: { saved: boolean },
  saveData: { user_id: string; job_id: string }
) {
  const supabase = await supabaseClient(token);

  if (options.saved) {
    console.log("Unsaving job...");
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id)
      .eq("user_id", saveData.user_id);

    if (deleteError) {
      console.log("Error deleting saved Jobs:", deleteError);
      return null;
    }

    return [];
  } else {
    console.log("Saving job...");
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select("*");

    if (insertError) {
      console.log("Error saving Job:", insertError);
      return null;
    }

    return data;
  }
}

export async function getSingleJob(token: string, options: { job_id: string }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select(
      "*, company:companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", options.job_id)
    .single();

    if(error){
      console.log(`Error Fetching job ${options.job_id}`, error);
      return null;
    }

    return data;
}

export async function updateHiringStatus(token: string, options: { job_id: string },isOpen: boolean) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({isOpen})
    .eq("id", options.job_id)
    .single();

    if(error){
      console.log(`Error updating job ${options.job_id}`, error);
      return null;
    }

    return data;
}

export async function addNewJob(token: string, _ : any,jobData: any) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs").insert([jobData]).select()

    if(error){
      console.log(`Error add job`, error);
      return null;
    }

    return data;
}