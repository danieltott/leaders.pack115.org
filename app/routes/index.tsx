import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import Layout from "~/components/Layout";
import { fetchAllData } from "~/data";
import type { Data, Ids } from "../../types";
import { useMemo, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CheckIcon } from "@heroicons/react/20/solid";

export function CopyAllEmails({ ids, data }: { ids: Ids; data: Data }) {
  const [copied, setCopied] = useState(false);

  const allEmails = useMemo(() => {
    const list = ids.adults.reduce<string[]>((acc, adultId) => {
      const adult = data.adults[adultId];
      if (adult["Email"]) {
        return [...acc, adult["Email"]];
      }

      return acc;
    }, []);
    return [...new Set(list)].join(", ");
  }, [data.adults, ids.adults]);

  return (
    <CopyToClipboard text={allEmails} onCopy={() => setCopied(true)}>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {copied && (
          <CheckIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        )}
        Copy All Emails
      </button>
    </CopyToClipboard>
  );
}

export async function loader(args: LoaderArgs) {
  const allData = await fetchAllData();

  return json(allData);
}

export default function Index() {
  const { data, ids } = useLoaderData<typeof loader>();
  return (
    <Layout title="Dashboard">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-nowrap">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Pack 115 Leaders Portal
          </h3>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            Welcome to the Pack 115 Leaders Portal. This is a work in progress,
            so please be patient as we add more features.
          </p>
        </div>
        <div className="flex-shrink-0">
          <CopyAllEmails ids={ids} data={data} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
          <div className="min-w-0 flex-1">
            <Link to="/dens" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Dens</p>
              <p className="truncate text-sm text-gray-500">
                View your Den information.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
