import { useState, useEffect } from "react";

type FetchStatus = "idle" | "loading" | "success" | "error";

interface FetchDataResponse<T> {
  data: T | null;
  error: string | null;
  status: FetchStatus;
}

function useFetchApi<T>(url: string): FetchDataResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData: T = await response.json();
        setData(jsonData);
        setStatus("success");
      } catch (error) {
        setError((error as Error).message || "An error occurred");
        setStatus("error");
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, error, status };

  // const response = await fetch(url);

  // if (!response.ok) return "Not Found";

  // const data = await response.json();

  // return data;
};

export default useFetchApi;