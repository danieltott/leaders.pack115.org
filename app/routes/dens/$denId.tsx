import invariant from "tiny-invariant";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
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

  const activeDenScouts = denScouts?.filter((scout) => {
    return scout.Status === "Active";
  });

  const potentialDenScouts = denScouts?.filter((scout) => {
    return scout.Status === "Potential";
  });

  return json({ ...allData, den, activeDenScouts, potentialDenScouts });
}

export default function Index() {
  const { data, ids, den, activeDenScouts, potentialDenScouts } =
    useLoaderData<typeof loader>();
  return (
    <Layout title={den["Den Name"]}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Active Scouts
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Scouts that are active and paid
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Parents
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Health Form Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {activeDenScouts?.map((scout) => (
                      <>
                        <tr key={scout["Scout Name"]}>
                          <td
                            className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                            rowSpan={scout.Parents?.length || 1}
                          >
                            {scout["Scout Name"]}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {scout["Parent Names"]?.[0] || null}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {scout["Parents' Email"]?.[0] || null}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {scout["Parents' Phones"]?.[0] || null}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {scout["Health form"]}
                          </td>
                        </tr>
                        {scout.Parents?.slice(1).map((parent, index) => (
                          <tr key={parent}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {scout["Parent Names"]?.[index + 1] || null}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {scout["Parents' Email"]?.[index + 1] || null}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {scout["Parents' Phones"]?.[index + 1] || null}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {scout["Health form"]}
                            </td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {potentialDenScouts && potentialDenScouts?.length > 0 && (
        <div className="mt-8 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Potential Scouts
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Scouts that have expressed interest in joining
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Parents
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Phone
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {potentialDenScouts?.map((scout) => (
                        <>
                          <tr key={scout["Scout Name"]}>
                            <td
                              className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                              rowSpan={scout.Parents?.length || 1}
                            >
                              {scout["Scout Name"]}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {scout["Parent Names"]?.[0] || null}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {scout["Parents' Email"]?.[0] || null}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {scout["Parents' Phones"]?.[0] || null}
                            </td>
                          </tr>
                          {scout.Parents?.slice(1).map((parent, index) => (
                            <tr key={parent}>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {scout["Parent Names"]?.[index + 1] || null}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {scout["Parents' Email"]?.[index + 1] || null}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {scout["Parents' Phones"]?.[index + 1] || null}
                              </td>
                            </tr>
                          ))}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
