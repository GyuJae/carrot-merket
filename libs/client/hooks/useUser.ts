import { useRouter } from "next/router";
import { IMeResponse } from "pages/api/users/me/index";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR<IMeResponse>("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [router, data]);
  return { user: data?.user, isLoading: !data && !error };
}
