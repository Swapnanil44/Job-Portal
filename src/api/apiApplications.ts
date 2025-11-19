import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token: string, _: any, jobData: any) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 9000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.log(`Error uploading resume ${fileName}:`, storageError);
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.log("Error submitting application", error);
    return null;
  }

  return data;
}

export async function updateApplicationStatus(
  token: string,
  options: { job_id: string },
  status: string
) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("jon_id", options.job_id)
    .select();

  if (error) {
    console.log("Error submitting application", error);
    return null;
  }

  return data;
}

export async function getApplications(token: string, options: { user_id: string }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", options.user_id);

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return data;
}
