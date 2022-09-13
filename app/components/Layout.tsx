import Header from "./Header";

export default function Layout({
  title,
  children,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      <Header title={title} />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">{children}</div>
        </div>
      </main>
    </>
  );
}
