import { useSession } from "@clerk/clerk-react";
import { useCallback, useState } from "react";

// Simplified version without generics
const useFetch = (cb: Function, options: any = {}) => {
  // data can be anything, so we use 'any'
  const [data, setData] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { session } = useSession();

  // 'args' will be an array of 'any' type
  const fn = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);

      try {
        if (!session) {
          throw new Error("No active Clerk session.");
        }

        const supabaseAccessToken = await session.getToken({
          template: "supabase",
        });

        if (!supabaseAccessToken) {
          throw new Error("Failed to retrieve Supabase access token.");
        }

        const response = await cb(supabaseAccessToken, options, ...args);
        setData(response);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      } finally {
        setLoading(false);
      }
    },
    [session, cb, options] // 3. Add its dependencies
  );

  return { data, loading, error, fn };
};

export default useFetch;