export default function CityPageSkeleton() {
  return (
    <div className="sm:mx-20 animate-pulse">
      <div className="h-10 w-3/4 max-w-xl bg-gray-200 rounded mb-3" />
      <div className="h-4 w-full max-w-3xl bg-gray-200 rounded mb-2" />
      <div className="h-4 w-5/6 max-w-2xl bg-gray-200 rounded mb-6" />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="h-9 w-44 bg-gray-200 rounded-full" />
        <div className="h-8 w-px bg-gray-200" />
        <div className="h-9 w-24 bg-gray-200 rounded-full" />
        <div className="h-9 w-28 bg-gray-200 rounded-full" />
        <div className="h-9 w-28 bg-gray-200 rounded-full" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden"
          >
            <div className="h-36 sm:h-40 bg-gray-200" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-4/5 bg-gray-200 rounded" />
              <div className="h-4 w-3/5 bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
              <div className="h-8 w-full bg-gray-200 rounded mt-2" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-12 mb-20">
        <div className="h-9 w-16 bg-gray-200 rounded" />
        <div className="h-9 w-9 bg-gray-200 rounded" />
        <div className="h-9 w-9 bg-gray-200 rounded" />
        <div className="h-9 w-9 bg-gray-200 rounded" />
        <div className="h-9 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
