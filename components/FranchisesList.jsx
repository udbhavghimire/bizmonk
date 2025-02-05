import Image from 'next/image';
import { franchiseList } from '@/data/franchise-data';

const FranchisesList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Franchise oppurtunities on Bizmonk</h2>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {franchiseList.map((partner) => (
          <div 
            key={partner.name}
            className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-20 mb-3">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 15vw"
              />
            </div>
            <p className="text-sm text-gray-600 text-center">{partner.displayName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FranchisesList; 