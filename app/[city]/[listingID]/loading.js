
export default function Loading() {
  return (
    <div className="flex justify-between max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="w-full">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded mb-6"></div>

        <section className="w-full flex flex-col items-center justify-center gy-2 relative">
          {/* Gallery Skeleton */}
          <div className="w-full h-[500px] bg-gray-200 rounded-xl mb-4"></div>

          {/* Badges Skeleton */}
          <div className="w-full flex gap-2 mb-6">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
          </div>

          {/* Main Content Grid Skeleton */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
            {/* Left Content */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Property Title & Price Skeleton */}
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-24 w-full bg-gray-200 rounded"></div>
              </div>

              {/* Booking Date Skeleton */}
              <div className="h-40 w-full bg-gray-200 rounded-xl"></div>

              {/* Map Skeleton */}
              <div className="h-64 w-full bg-gray-200 rounded-xl"></div>
            </div>

            {/* Right Sticky Form Skeleton */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="h-[600px] w-full bg-gray-200 rounded-xl sticky top-4"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
