import { useState } from "react";

export const useShouldFetch = () => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  return { shouldFetch, setShouldFetch };
};
