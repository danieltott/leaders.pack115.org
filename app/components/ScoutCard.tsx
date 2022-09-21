import type { Scout } from "../../types";
import { UsersIcon, CheckIcon } from "@heroicons/react/20/solid";
import { useMemo, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "~/components/Card";

export function CopyEmailsFromScouts({
  scouts,
}: {
  scouts: Scout[];
}): JSX.Element {
  const [copied, setCopied] = useState(false);

  const allEmails = useMemo(() => {
    const list = scouts.reduce<string[]>((acc, scout) => {
      if (scout["Parents' Email"] && scout["Parents' Email"].length > 0) {
        return [...acc, ...scout["Parents' Email"]];
      }
      return acc;
    }, []);
    return list.join(", ");
  }, [scouts]);

  return (
    <CopyToClipboard text={allEmails} onCopy={() => setCopied(true)}>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {copied && (
          <CheckIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        )}
        Copy all emails
      </button>
    </CopyToClipboard>
  );
}

export default function ScoutCard({
  scouts,
  title,
  description,
}: {
  scouts: Scout[];
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <Card
      title={title}
      description={description}
      actions={<CopyEmailsFromScouts scouts={scouts} />}
    >
      <div className="flow-root">
        <ul className="divide-y divide-gray-200">
          {scouts?.map((scout) => (
            <li key={scout["Scout Name"]}>
              <a href="#x" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-sky-600">
                      {scout["Scout Name"]}
                    </p>
                    <div className="ml-2 flex flex-shrink-0">
                      {scout["Tags"]?.map((tag) => (
                        <p
                          key={tag}
                          className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                        >
                          {tag}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex sm:gap-4">
                      {scout["Parent Names"]?.map((parentName) => (
                        <p
                          key={parentName}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <UsersIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {parentName}
                        </p>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      {/* <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <p>
                      Closing on <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                    </p> */}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
