import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/node";
import Layout from "~/components/Layout";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { fetchAllData } from "~/data";

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
        <ul role="list" className="divide-y divide-gray-200">
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
