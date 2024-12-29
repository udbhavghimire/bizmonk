export default function CityRestaurants({ params }) {
  const { city } = params;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Restaurants for Sale in {city.charAt(0).toUpperCase() + city.slice(1)}
        </h1>

        {/* Add your restaurant listings here */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-500">
              No listings available at the moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
