import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home Remodeling Partners | TOPTIER BATH PROS',
  description: 'TOPTIER BATH PROS has established numerous partnerships spanning across the United States with home remodeling companies, bathroom specialists, and renovation contractors.',
};

export default function Partners() {
  const partnerCategories = [
    {
      title: 'Bathroom Remodeling Partners',
      partners: [
        'Bath Experts', 'Bath Experts LLC', 'Bath Remodel by Capital', 'Bath concepts',
        'Billy.com', 'Jacuzzi', 'Premier Home Pros', 'Zintex', 'My Bath Colorado',
        'Tubbs by Grubbs', 'New Pro', 'New Bath Today', 'Kohler', 'Long Home',
        'BathWorks of Michigan', 'CareFree Home Pros', 'OpenHome', 'OpenHome Pros',
        'Midwest Bath Company', 'Rocky Mountain Bath Company', 'Bath Wizard',
        'American Standard', 'American Home Shield'
      ]
    },
    {
      title: 'Home Remodeling & Exteriors',
      partners: [
        '1800 Remodel', 'American Remodeling', 'Victory Home Remodeling',
        'Clear Choice Home Improvement', 'Future Remodeling', 'DaBella',
        'Continental Siding', 'New Pro Home Remodeling', 'C Michael Exteriors',
        'Champion Siding', 'Home Genius Exteriors', 'Capital Construction Contracting',
        'National Home Project', 'Floor Coverings International'
      ]
    },
    {
      title: 'Roofing Partners',
      partners: [
        'Crowther Roofing and Cooling', 'Advanced Roofing, Inc.', 'Anderson Windows',
        'Baker Roofing Company', 'Best Choice Roofing', 'Bone Dry Roofing',
        'Centimark Corporation', 'Corey Construction', 'Crown Roofing & Waterproofing',
        'Erie', 'Greenwood Industries, Inc.', 'Infinity Home Services',
        'Jolly Roofing & Contracting Company, Inc.', 'Kalkreuth Roofing and Sheet Metal',
        'Legacy Restoration', 'Nations Roof', "O'Hara's Son Roofing Company",
        'RestoreMasters', 'Roofing Corp of America', 'Stronghouse Solutions',
        'Tecta America', 'CCX Roofing', "Cody Clinger's Roofing",
        'Roofix Technologies LLC', 'Breezy Roofing powered by Roofix',
        'Breezy Roofing LLC'
      ]
    },
    {
      title: 'Window & Door Partners',
      partners: [
        'Champion Windows and Home Exteriors', 'Anderson Windows',
        'Superior Home', 'SmartHome Solutions USA', 'NewStrata'
      ]
    },
    {
      title: 'Marketing & Lead Generation Partners',
      partners: [
        'AA Media Inc', 'Ad Energy', 'CallCore Media', 'Direct Web Advertising',
        'DSG Media', 'General Lab Marketing Solutions', 'Global Summit Media',
        'Native Media, LLC', 'Presidio Interactive Corporation', 'Pointer Leads',
        'VSC Digital Media', 'Adventum.io', 'Rex Direct Net, Inc.', 'Pointer Leads Inc.',
        'Everconnect', 'Alpine Digital Group, Inc.', 'RGR Marketing', 'EverContractor',
        'MediaDevoted1', 'SolarGiveback', 'Homelix'
      ]
    },
    {
      title: 'Financial & Insurance Partners',
      partners: [
        'Amerisave Mortgage', 'Union Home Mortgage', 'Rocket Mortgage',
        'West Capital Lending', 'Key One Financial', 'Innovative Financial Group',
        'Innovative Financial Partners LLC'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <nav className="mb-8">
            <ol className="flex items-center justify-center space-x-2 text-teal-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>&gt;</li>
              <li className="text-white">Home Remodeling Partners</li>
            </ol>
          </nav>
          <h1 className="text-5xl font-bold mb-6">Home Remodeling Partners</h1>
          <p className="text-xl text-teal-100 max-w-4xl mx-auto leading-relaxed">
            TOPTIER BATH PROS has established numerous partnerships spanning across the United States, 
            with a diverse range of collaborators including bathroom specialists, home remodeling contractors, 
            and renovation experts. By leveraging this extensive network of partnerships, TOPTIER BATH PROS 
            is able to offer its clientele unparalleled access to the most advantageous home improvement 
            solutions available.
          </p>
        </div>
      </div>

      {/* Partners List */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        {partnerCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {category.partners.map((partner, partnerIndex) => (
                <div
                  key={partnerIndex}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-4 border border-gray-100"
                >
                  <div className="flex items-center justify-center h-16">
                    <span className="text-gray-800 font-medium text-center text-sm leading-tight">
                      {partner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-3xl p-12 text-center border border-teal-100 mt-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Bathroom?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Partner with TOPTIER BATH PROS and our network of trusted professionals 
            to create the bathroom of your dreams. Get your free consultation today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#lead-form"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Get Free Quote</span>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-bold py-4 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm max-w-4xl mx-auto">
            *Partnerships are established to provide comprehensive home remodeling solutions. 
            Partner availability may vary by location and project requirements. Contact TOPTIER BATH PROS 
            for specific partnership details and service availability in your area.
          </p>
        </div>
      </div>
    </div>
  );
}
