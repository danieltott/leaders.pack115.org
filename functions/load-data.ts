import Airtable from "airtable";
import { builder } from "@netlify/functions";
import type { Handler } from "@netlify/functions";
import type {
  Den,
  Scout,
  Adult,
  Position,
  CubHauntedSignup,
  Data,
  Ids,
} from "../types";
import invariant from "tiny-invariant";

async function loadAllData() {
  invariant(process.env.AIRTABLE_BASE_ID, "Airtable Base ID not found");
  invariant(process.env.AIRTABLE_API_KEY, "Airtable API Key not found");

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );

  console.log("Loading data from Airtable...");
  const data: Data = {
    dens: {},
    scouts: {},
    adults: {},
    positions: {},
    cubHauntedSignups: {},
  };

  const ids: Ids = {
    dens: [],
    scouts: [],
    adults: [],
    positions: [],
    cubHauntedSignups: [],
  };

  const dens = await base<Den>("Dens")
    .select({
      view: "All Dens",
    })
    .all();

  dens.forEach((record) => {
    data.dens[record.id] = record.fields;
    ids.dens.push(record.id);
  });

  console.log("Loaded Dens");

  const scouts = await base<Scout>("Scouts")
    .select({
      view: "All Scouts",
    })
    .all();

  scouts.forEach((record) => {
    data.scouts[record.id] = record.fields;
    ids.scouts.push(record.id);
  });

  console.log("Loaded Scouts");
  const adults = await base<Adult>("Adults")
    .select({
      view: "All Adults",
    })
    .all();

  adults.forEach((record) => {
    data.adults[record.id] = record.fields;
    ids.adults.push(record.id);
  });

  console.log("Loaded Adults");

  const positions = await base<Position>("Pack Leader Positions")
    .select({
      view: "All Positions",
    })
    .all();

  positions.forEach((record) => {
    data.positions[record.id] = record.fields;
    ids.positions.push(record.id);
  });

  console.log("Loaded Positions");

  const cubHauntedSignups = await base<CubHauntedSignup>("Cub Haunted Signups")
    .select({
      view: "All Signups",
    })
    .all();

  cubHauntedSignups.forEach((record) => {
    data.cubHauntedSignups[record.id] = record.fields;
    ids.cubHauntedSignups.push(record.id);
  });

  console.log("Loaded Cub Haunted Signups");

  console.log({ data, ids });

  return { data, ids };
}

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
