import { AllData } from "../types";

export async function fetchAllData() {
  const allDataResponse = await fetch(
    "http://localhost:3000/.netlify/functions/load-data"
  );

  const allData: AllData = await allDataResponse.json();

  return allData;
}
