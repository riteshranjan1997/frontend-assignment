/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ITEM_PER_PAGE } from "@/utils/constant";

interface IUseFetchWithAbortResponse {
  paginatedData: unknown;
  isLoading: boolean;
  error: Error | null;
  fetchedData: any;
}

export const useFetchWithAbort = (
  endpoint: string,
  page?: number,
  options?: ResponseInit
): IUseFetchWithAbortResponse => {
  const [fetchedData, setFetchedData] = useState();
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController: AbortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint, {
          ...(options || undefined),
          signal: abortController.signal,
        });
        const newData = await response.json();
        setIsLoading(false);
        setFetchedData(newData);
      } catch (error: any) {
        if (error.name === "AbortError") {
          setIsLoading(false);
        } else {
          setError(error);
        }
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [endpoint, options]);

  useEffect(() => {
    if (page && fetchedData) {
      const offSet = page > 1 ? (page - 1) * ITEM_PER_PAGE : 0;
      const result = (fetchedData as any).slice(offSet, offSet + ITEM_PER_PAGE);
      setPaginatedData(result);
    }
  }, [fetchedData, page]);

  return { isLoading, error, paginatedData, fetchedData };
};
