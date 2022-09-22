import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import Layout from "~/components/Layout";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { fetchAllData } from "~/data";
import type { Data, Ids } from "../../../types";
import { useMemo, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CheckIcon } from "@heroicons/react/20/solid";

export function CopyEmailsFromLeaders({ ids, data }: { ids: Ids; data: Data }) {
  const [copied, setCopied] = useState(false);

  const allEmails = useMemo(() => {
    const list = ids.dens.reduce<string[]>((acc, denId) => {
      const den = data.dens[denId];
      if (den["Den Leader Emails"] && den["Den Leader Emails"].length > 0) {
        return [...acc, ...den["Den Leader Emails"]];
      }

      return acc;
    }, []);
    return list.join(", ");
  }, [data.dens, ids.dens]);

  return (
    <CopyToClipboard text={allEmails} onCopy={() => setCopied(true)}>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {copied && (
          <CheckIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        )}
        Copy Den Leader Emails
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
  // console.log(data, ids);
  return (
    <Layout title="Dens">
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <div className="border-b border-gray-200 px-4 py-4 text-right sm:px-6">
          <CopyEmailsFromLeaders data={data} ids={ids} />
        </div>
        <ul className="divide-y divide-gray-200">
          {ids.dens.map((denId) => {
            const den = data.dens[denId];
            return (
              <li key={denId}>
                <Link to={denId} className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="truncate text-sm font-medium text-indigo-600">
                            {den["Name"]}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            {den["Den Leaders"] &&
                              den["Den Leaders"]
                                .map((leaderId) => {
                                  const leader = data.adults[leaderId];
                                  return leader["Name"];
                                })
                                .join(", ")}
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              {den.Scouts
                                ? `${den.Scouts?.length} Scouts`
                                : "No Scouts"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}
