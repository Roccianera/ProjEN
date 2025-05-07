import { useState } from "react";

type OptimisticUpdate<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  update: (updateFn: () => Promise<T>) => Promise<void>;
};

export function useOptimisticUpdate<T>(
  initialData: T | null = null
): OptimisticUpdate<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (updateFn: () => Promise<T>) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await updateFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      // Non rimuoviamo i dati esistenti in caso di errore
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, update };
}
