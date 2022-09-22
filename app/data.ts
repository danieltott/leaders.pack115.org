import Airtable from "airtable";
import type {
  Den,
  Scout,
  Adult,
  Position,
  CubHauntedSignup,
  Data,
  Ids,
  AllData,
} from "../types";
import invariant from "tiny-invariant";
import { qualifiedUrl } from "~/util/url.server";

export async function loadAllData(): Promise<AllData> {
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

  const scouts = await base<Scout>("Scouts")
    .select({
      view: "All Scouts",
    })
    .all();

  scouts.forEach((record) => {
    data.scouts[record.id] = record.fields;
    ids.scouts.push(record.id);
  });

  const adults = await base<Adult>("Adults")
    .select({
      view: "All Adults",
    })
    .all();

  adults.forEach((record) => {
    data.adults[record.id] = record.fields;
    ids.adults.push(record.id);
  });

  const positions = await base<Position>("Pack Leader Positions")
    .select({
      view: "All Positions",
    })
    .all();

  positions.forEach((record) => {
    data.positions[record.id] = record.fields;
    ids.positions.push(record.id);
  });

  const cubHauntedSignups = await base<CubHauntedSignup>("Cub Haunted Signups")
    .select({
      view: "All Signups",
    })
    .all();

  cubHauntedSignups.forEach((record) => {
    data.cubHauntedSignups[record.id] = record.fields;
    ids.cubHauntedSignups.push(record.id);
  });

  return { data, ids };
}

export async function fetchAllData() {
  if (process.env.NETLIFY_LOCAL) {
    const allData = await loadAllData();
    return allData;
  }

  const allDataResponse = await fetch(
    qualifiedUrl("/.netlify/functions/load-data")
  );
  if (allDataResponse.ok) {
    const allData: AllData = await allDataResponse.json();

    return allData;
  } else {
    console.log(allDataResponse.status);
    console.log(allDataResponse.statusText);
    console.log(await allDataResponse.text());
    throw new Error("Failed to fetch all data");
  }
}
