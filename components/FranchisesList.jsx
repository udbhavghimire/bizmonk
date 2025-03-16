import Image from 'next/image';
import Link from 'next/link';
import { franchiseList } from '@/data/franchise-data';

const FranchisesList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-8">
      <div className="text-center ">
        <h2 className="text-3xl font-bold text-gray-900 mb-3"> 50+ Franchise opportunities on Bizmonk</h2>
        <p className='max-w-3xl mx-auto text-center mb-5'>Find the perfect franchise opportunity in Ontario with Bizmonk—offering 50+ profitable options to kickstart your entrepreneurial journey. Never too late to start.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {franchiseList.map((partner) => (
          <Link 
            key={partner.name}
            href={"/franchise-opportunity/ontario/"}
            className="group flex flex-col items-center justify-center text-center"
          >
          
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white/50">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 15vw"
              />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-3 group-hover:text-primary transition-colors">
              {partner.displayName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FranchisesList; 