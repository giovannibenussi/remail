import { useEffect, useState } from "react";

export function useSearchParam(paramName: string) {
  const [paramValue, setParamValue] = useState<string | null>(null);
  console.log("paramName:", paramName);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log("searchParams:", searchParams);
    const value = searchParams.get(paramName);

    setParamValue(value);
  }, [paramName]);

  return paramValue;
}
