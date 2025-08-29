import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners | TOPTIER BATH PROS',
  description: 'Selected suppliers and trade partners for TOPTIER BATH PROS bathroom remodeling services.',
};

export default function Partners() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Selected Suppliers & Trade Partners</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            TOPTIER BATH PROS works with trusted manufacturers and suppliers to deliver premium bathroom remodeling solutions. 
            Our partnerships ensure quality materials, reliable service, and competitive pricing for our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Bathroom Fixtures & Materials */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Fixtures</h3>
            <p className="text-gray-600 text-sm">Kohler, Moen, Delta, American Standard</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tile & Stone</h3>
            <p className="text-gray-600 text-sm">Porcelain, Ceramic, Natural Stone</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Shower Systems</h3>
            <p className="text-gray-600 text-sm">Frameless Glass, Acrylic, Custom</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vanities & Storage</h3>
            <p className="text-gray-600 text-sm">Custom Cabinetry, Medicine Cabinets</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lighting</h3>
            <p className="text-gray-600 text-sm">LED, Recessed, Vanity Lighting</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Plumbing</h3>
            <p className="text-gray-600 text-sm">PEX, Copper, Fixtures</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flooring</h3>
            <p className="text-gray-600 text-sm">Waterproof, Slip-Resistant</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
            <p className="text-gray-600 text-sm">ADA Compliant Solutions</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            *Partnerships subject to availability and may vary by location. Contact us for specific product availability.
          </p>
        </div>
      </div>
    </div>
  );
}
