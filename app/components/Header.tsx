export default function Header({ title }: { title: string }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold leading-6 text-gray-900">
          {title}
        </h1>
      </div>
    </header>
  );
}
