import {useState } from 'react';

export function useShouldFetch() {
    const [shouldFetch, setShouldFetch] = useState<boolean>(true);

 
    return {shouldFetch,setShouldFetch};
}
