import supabaseClient from "@/utils/supabase";

export async function getJobs(token: string){
    const supabase = await supabaseClient(token);

    let query = supabase.from("jobs").select("*");

    const {data, error} = await query;

    if(error){
        console.log("Error fetching jobs: ", error);
        throw new Error(error.message);
    }

    return data;
}