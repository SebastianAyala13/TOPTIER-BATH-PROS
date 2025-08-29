import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | TOPTIER BATH PROS',
  description: 'Terms of Service for TOPTIER BATH PROS - Learn about our terms and conditions for bathroom remodeling services.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the TOPTIER BATH PROS website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                TOPTIER BATH PROS provides bathroom remodeling services including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Bathroom design and consultation</li>
                <li>Tub to shower conversions</li>
                <li>Vanity and fixture installation</li>
                <li>Tile and flooring installation</li>
                <li>Plumbing and electrical work</li>
                <li>Project management and coordination</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use of Website</h2>
              <p className="text-gray-700 mb-4">
                Our website is provided for informational purposes only. You may use our website to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Learn about our bathroom remodeling services</li>
                <li>Request quotes and estimates</li>
                <li>Schedule consultations</li>
                <li>Contact our team</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You agree not to use the website for any unlawful purpose or in any way that could damage, disable, overburden, or impair the website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Quotes and Estimates</h2>
              <p className="text-gray-700 mb-4">
                All quotes and estimates provided are:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Valid for 30 days from the date of issue</li>
                <li>Subject to on-site inspection and verification</li>
                <li>Based on current material and labor costs</li>
                <li>Subject to change based on project scope modifications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Project Terms</h2>
              <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Scheduling</h3>
              <p className="text-gray-700 mb-4">
                Project scheduling is subject to availability and may be affected by weather conditions, material availability, and other factors beyond our control.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Payment Terms</h3>
              <p className="text-gray-700 mb-4">
                Payment terms will be specified in individual project contracts. Generally, we require:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Deposit upon contract signing</li>
                <li>Progress payments as specified in the contract</li>
                <li>Final payment upon project completion</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.3 Warranty</h3>
              <p className="text-gray-700 mb-4">
                We provide warranty coverage for our workmanship and materials as specified in individual project contracts and manufacturer warranties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of TOPTIER BATH PROS and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, TOPTIER BATH PROS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, INCURRED BY YOU OR ANY THIRD PARTY.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimers</h2>
              <p className="text-gray-700 mb-4">
                                 THE INFORMATION ON THIS WEBSITE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless TOPTIER BATH PROS from any claims, damages, or expenses arising from your use of our website or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>TOPTIER BATH PROS</strong><br />
                  Email: <a href="mailto:contact@toptierbathpros.com" className="text-teal-600 hover:text-teal-800">contact@toptierbathpros.com</a><br />
                  Address: Los Angeles, CA<br />
                  Phone: Available upon request
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
