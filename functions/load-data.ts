import { builder } from "@netlify/functions";
import type { Handler } from "@netlify/functions";
import { loadAllData } from "../app/data";

// This file is an On-Demand Builder
// It allows us to cache third-party data for a specified amount of time
// Any deploys will clear the cache
// Read more here: https://docs.netlify.com/configure-builds/on-demand-builders/

const handlerFn: Handler = async (event) => {
  const data = await loadAllData();
  return {
    statusCode: 200,
    ttl: 60 * 60, // one hour in seconds
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

const handler = builder(handlerFn);

export { handler };
