import invariant from "tiny-invariant";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import Layout from "~/components/Layout";
import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";
import { fetchAllData } from "~/data";
import ScoutCard, { CopyEmailsFromScouts } from "~/components/ScoutCard";
import Card from "~/components/Card";
import type { Scout, Data, Ids } from "types";
import ScoutPanel from "~/components/ScoutPanel";

export async function loader({ request, params }: LoaderArgs) {
  console.log("hello");
  invariant(params.denId, "denId not found");

  const allData = await fetchAllData();

  console.log({ allData });
  const den = allData.data.dens[params.denId];
  const denScouts = den.Scouts?.map(
    (scoutId) => allData.data.scouts[scoutId]
  ).sort((a, b) => a["Scout Name"].localeCompare(b["Scout Name"]));

  const activeDenScouts = denScouts?.filter((scout) => {
    return scout.Status === "Active";
  });

  const potentialDenScouts = denScouts?.filter((scout) => {
    return scout.Status === "Potential";
  });

  const cubHauntedDenScouts = denScouts?.filter((scout) => {
    return (
      scout["Cub Haunted Signups"] && scout["Cub Haunted Signups"].length > 0
    );
  });

  return json({
    ...allData,
    den,
    activeDenScouts,
    potentialDenScouts,
    cubHauntedDenScouts,
  });
}

function CubHauntedScoutCard({
  scout,
  data,
  ids,
}: {
  scout: Scout;
  data: Data;
  ids: Ids;
}) {
  const cubHauntedSignups = scout["Cub Haunted Signups"];
  if (!cubHauntedSignups || cubHauntedSignups.length === 0) {
    return null;
  }

  const cubHauntedSignupsData = cubHauntedSignups.map(
    (id) => data.cubHauntedSignups[id]
  )[0];

  if (!cubHauntedSignupsData) {
    return null;
  }

  const hasAdditionalChildren =
    (cubHauntedSignupsData["Scout(s)"] &&
      cubHauntedSignupsData["Scout(s)"].length > 1) ||
    !!cubHauntedSignupsData["Additional Children"];

  return (
    <div
      key={scout["Scout Name"]}
      className="relative flex items-start space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div className="min-w-0 flex-1">
        <a href="#x" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-semibold text-gray-900">
            {scout["Scout Name"]}
          </p>
          <p className="text-sm text-gray-500">
            <span className="text-gray-900">Adults:</span>{" "}
            {cubHauntedSignupsData["Adult(s)"]
              ?.map((id) => data.adults[id].Name)
              .join(", ")}
          </p>
          {cubHauntedSignupsData["Additional Adults"] && (
            <p className="text-sm text-gray-500">
              {cubHauntedSignupsData["Additional Adults"]}
            </p>
          )}
          {hasAdditionalChildren && (
            <>
              <p className="text-sm text-gray-500">
                <span className="text-gray-900">Additional Children:</span>{" "}
                {cubHauntedSignupsData["Scout(s)"]
                  ?.filter(
                    (id) =>
                      data.scouts[id]["Scout Name"] !== scout["Scout Name"]
                  )
                  .map((id) => data.scouts[id]["Scout Name"])
                  .join(", ")}
              </p>
              {cubHauntedSignupsData["Additional Children"] && (
                <p className="text-sm text-gray-500">
                  {cubHauntedSignupsData["Additional Children"]}
                </p>
              )}
            </>
          )}
          {typeof cubHauntedSignupsData["Total Day Passes"] !== "undefined" &&
            cubHauntedSignupsData["Total Day Passes"] > 0 && (
              <p className="text-sm text-gray-500">
                <span className="text-gray-900">Day Passes:</span>{" "}
                {cubHauntedSignupsData["Total Day Passes"]}
              </p>
            )}
          {typeof cubHauntedSignupsData["Total Weekend Passes"] !==
            "undefined" &&
            cubHauntedSignupsData["Total Weekend Passes"] > 0 && (
              <p className="text-sm text-gray-500">
                <span className="text-gray-900">Weekend Passes:</span>{" "}
                {cubHauntedSignupsData["Total Weekend Passes"]}
              </p>
            )}
        </a>
      </div>
      <div className="flex-shrink-0">
        {!cubHauntedSignupsData["Paid"] && (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            Needs Payment: ${cubHauntedSignupsData["Total Owed"]}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const {
    data,
    ids,
    den,
    activeDenScouts,
    potentialDenScouts,
    cubHauntedDenScouts,
  } = useLoaderData<typeof loader>();
  return (
    <Layout title={den["Den Name"]}>
      <div className="space-y-4">
        {activeDenScouts && (
          <ScoutCard
            title="Active Scouts"
            scouts={activeDenScouts}
            description="Scouts that are active and paid"
            data={data}
            ids={ids}
          />
        )}

        {potentialDenScouts && potentialDenScouts?.length > 0 && (
          <ScoutCard
            title="Potential Scouts"
            scouts={potentialDenScouts}
            description="Scouts that have expressed interest in joining"
            data={data}
            ids={ids}
          />
        )}

        {cubHauntedDenScouts && cubHauntedDenScouts?.length > 0 && (
          <div>
            <div className="mb-4 border-b border-gray-200 py-4 ">
              <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Cub Haunted Signups
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Scouts that have signed up for Cub Haunted
                  </p>
                </div>
                <div className="ml-4 mt-4 flex-shrink-0">
                  <CopyEmailsFromScouts scouts={cubHauntedDenScouts} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cubHauntedDenScouts?.map((scout) => (
                <CubHauntedScoutCard
                  key={scout["Scout Name"]}
                  scout={scout}
                  data={data}
                  ids={ids}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
