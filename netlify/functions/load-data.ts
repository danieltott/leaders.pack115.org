import Airtable from "airtable";
import { builder, Handler } from "@netlify/functions";
import type {
  Den,
  Scout,
  Adult,
  Position,
  CubHauntedSignup,
  Data,
  Ids,
} from "../../types";
import invariant from "tiny-invariant";

// This file is an On-Demand Builder
// It allows us to cache third-party data for a specified amount of time
// Any deploys will clear the cache
// Read more here: https://docs.netlify.com/configure-builds/on-demand-builders/

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

const handlerFn: Handler = async (event) => {
  invariant(process.env.AIRTABLE_BASE_ID, "Airtable Base ID not found");
  invariant(process.env.AIRTABLE_API_KEY, "Airtable API Key not found");

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );

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

  // https://airtable.com/appc2823KlEb1rwbd/tblrpkgUJbhOn6AAK/viwWgxnba6Pbjs5xs/recPRxHQKk8yeHWrU?blocks=hide
  // https://airtable.com/appc2823KlEb1rwbd/tblnJNu6QpyMnl6zD/viwPuCgu86ZSuIIkW/rec6mN9q1me6EMFar?blocks=hide
  // https://airtable.com/appc2823KlEb1rwbd/tbl0tHkXBEbWn9TPP/viwyMIQ7NU6eX8xhU/recJCrIGRIgYhDcJo?blocks=hide

  return {
    statusCode: 200,
    ttl: 60 * 24 * 265, // in seconds
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data, ids }),
  };
};

const handler = builder(handlerFn);

export { handler };
