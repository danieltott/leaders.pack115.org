import { Link } from "@remix-run/react";
import Layout from "~/components/Layout";

export default function Index() {
  return (
    <Layout title="Dashboard">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Pack 115 Leaders Portal
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Welcome to the Pack 115 Leaders Portal. This is a work in progress, so
          please be patient as we add more features.
        </p>
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
