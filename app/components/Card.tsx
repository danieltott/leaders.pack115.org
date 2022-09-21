export default function Card({
  children,
  title,
  description,
  actions,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode | null;
  actions?: React.ReactNode;
}) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>
          {actions && <div className="ml-4 mt-4 flex-shrink-0">{actions}</div>}
        </div>
      </div>

      {children}
    </div>
  );
}
