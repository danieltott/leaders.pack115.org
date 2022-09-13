import invariant from "tiny-invariant";
import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/node";
import Layout from "~/components/Layout";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { fetchAllData } from "~/data";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.denId, "denId not found");

  const allData = await fetchAllData();

  const den = allData.data.dens[params.denId];
  const denScouts = den.Scouts?.map(
    (scoutId) => allData.data.scouts[scoutId]
  ).sort((a, b) => a["Scout Name"].localeCompare(b["Scout Name"]));

  return json({ ...allData, den, denScouts });
}

export default function Index() {
  const { data, ids, den, denScouts } = useLoaderData<typeof loader>();
  return (
    <Layout title={den["Den Name"]}>
      <ul>
        {denScouts?.map((scout) => (
          <li key={scout["Scout Name"]}>{scout["Scout Name"]}</li>
        ))}
      </ul>
    </Layout>
  );
}
