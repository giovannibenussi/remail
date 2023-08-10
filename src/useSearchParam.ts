//import { useEffect, useState } from "react";

//export function useSearchParam(paramName: string) {
//const [paramValue, setParamValue] = useState<string | null>(null);

//useEffect(() => {
//const searchParams = new URLSearchParams(window.location.search);
//const value = searchParams.get(paramName);

//setParamValue(value);
//}, [paramName]);

//return paramValue;
//}

export function useSearchParam(paramName: string) {
  return "hi";
}
