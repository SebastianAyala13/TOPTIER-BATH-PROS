'use client';

import { useLanguage } from '../../context/LanguageContext';

export default function Partners() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Home Services Partners',
      subtitle:
        'Zarate Marketing, the parent company of Best Deal Roofing, has established numerous marketing partnerships spanning across the United States. This includes collaborations with insurance providers, solar consultancy firms, and home improvement leaders. Through this powerful network, we are able to offer our customers unparalleled access to the most advantageous roofing and solar deals available.',
      partners: [
        '1800 Remodel', 'AA Media Inc', 'Absolute Health Agents', 'Accuquote', 'Acudial',
        'Ad Energy', 'ADT', 'ADT Solar', 'Advocate My Insurance', 'Affinity Solar',
        'AHG Insurance', 'Allstate', 'American Benefits', 'Amerisave Mortgage', 'Amerisave Solar',
        'Ancelet Advising', 'Anomoly Squared', 'Apricot Solar', 'Aragon', 'Autoprotectors.us',
        'AXAD Capital', 'BC Group, LLC', 'Benefits Team', 'Better Living Health Services', 'Big Sky Solar',
        'CallCore Media', 'Capital Construction Contracting', 'Century Health and Life, LLC',
        'Champion Windows and Home Exteriors', 'Choice Health', 'Choice One Health & Life Agency',
        'Serenity Time', 'Sharpen Product Advisors', 'Sharpens Solutions Group', 'Shine Solar',
        'Shop RX Plans', 'Simple life solutions', 'Simple Life Solutions', 'Simple Options Agency',
        'Simple Solar', 'Sky Solar Energy', 'Smart Final Expense', 'Smart Match Insurance Agency',
        'Smart Solar', 'Smart Solar Energy', 'SmartHome Solutions USA', 'SmartScripts & Affiliates',
        'SmartScripts Agents', 'SNK Media', 'Sol 365, LLC', 'Sol Energy', 'Solar East Coast',
        'Solar Energy World', 'Solar America', 'Solar Five', 'Solar Match', 'Source Power',
        'Sqarq healthcare', 'Stamina Solar', 'State Energy LLC', 'Sun Doctor Solar', 'Sunlink Energy',
        'Sunnova', 'Sunpower', 'Sunpro Solar', 'Sunrun', 'Sunworks', 'Superior Home',
        'Tapert Insurance Agency', 'The Medicare Basics', 'The Solar Guy', 'The Solar Project',
        'Thomas Arts', 'Titan Solar', 'Choice Right, LLC', 'City Power and Gas', 'Citycom Solar',
        'Clean Energy Experts', 'Clean Energy Professionals', 'Clever Energy', 'Client Consent Health',
        'Client Consent Medicare', 'Climax Solar', 'Cloud9 Sleep Systems LLC', 'Consumer Advocacy, LLC',
        'Consumer Ai', 'Coverance Insurance', 'Dabella', 'Direct Web Advertising', 'Drivebpo',
        'DSG Media', 'EasyHealth Insurance Services', 'Element Power, LLC', 'Energy Defenders',
        'Family First Insurance Advisors', 'Final Expense Select', 'First Choice Health Company',
        'Freedom Solar', 'General Lab Marketing Solutions', 'Genesis Health Agency', 'Genie Energy',
        'Gerber', 'Gerber Life', 'Get Me Healthcare', 'Get Me Medicare', 'Global Connections',
        'Global Summit Media', 'Healthplan Outlook', 'Healthubb LLC', 'Hearing Better Now',
        'High Definition Solar', 'Highland Health Care', 'Inn Seasons Resorts',
        'Innovative Financial Group', 'Innovative Financial Partners LLC', 'Insurance Connection Today',
        'Insurance Guide', 'Insurance Line One', 'Insurance Supermarket', 'Insure Choice, LLC',
        'Ion Solar', 'Key One Financial', 'Kin Insurance', 'Kinetic Solar', 'Kuubix Energy Inc',
        'Kuubix Global LLC', 'Lumino Consulting', 'US Health Group', 'US Medicare Advisors',
        'US Medicare Solutions', 'Utility Partners of America', 'VANASIS', 'Veerus Holdings, LLC',
        'Veerus Leads', 'Victory Home Remodeling', 'Vivint', 'Volt Seed Tech, LLC', 'VSC Digital Media',
        'Water Improvement Technologies, LLC', 'West Capital Lending', 'WORK', 'WORLD BPO LLC',
        'You Benefit Solar', 'Rocket Mortgage', 'Rocket Solar', 'Benefits Team', 'Volt Energy Solar',
        'Lumio', 'Medical Media', 'Medicare Planning of America', 'Medicare10', 'Medsupp Experts',
        'Metro Renewables', 'Miracle-Ear Hearing Centers of Arkansas', 'Mobile Help', 'Modern Brokers of America',
        'Momentum', 'MV Realty PBC, LLC', 'My Health Angel', 'My Legal Protect', 'National General',
        'National Senior Benefit Advisors', 'NationalHomeProject', 'Native Media, LLC', 'NeedHealth',
        'New Strata', 'New York Power Solutions', 'Number One Health', 'OFFERWEB', 'OPTIMIRS PTE. LTD',
        'Orange Medical Supply', 'Ox Car Care', 'PolicyBind, LLC', 'Powur', 'Premier Insurance Benefits, LLC',
        'Presidio Interactive Corporation', 'Primerica', 'Pro Custom Solar', 'Professional Broker Solar',
        'Prosperity Life', 'Purified Leads', 'QuoteStorm', 'Quoting Fast LLC', 'Ranchero Power',
        'Right Advisors, LLC', 'Saddlepoint', 'Select Quote', 'Selsco Solar', 'Senior Care Complete',
        'Senior Direct Insurance', 'Senior Healthcare Advisors', 'Senior Life Sales', 'Senior Medical Group',
        'Senior Planning of America', 'Senior Product Advisors', 'Senior Product Group',
        'Senior Solutions Group', 'Senior Solutions Insurance', 'SeniorCareUSA', 'Total Care Products',
        'Total Insurance Brokers', 'Total Value Products', 'Townsquare energy', 'Trademarc', 'Tranzact',
        'Union Home Mortgage', 'United Advisors', 'Together Health', 'Bath Experts', 'Bath Experts LLC',
        'Bath Remodel by Capital', 'BCI Acrylic', 'Billy.com', 'Jacuzzi', 'Premier Home Pros', 'Zintex',
        'My Bath Colorado', 'Tubbs by Grubbs', 'New Pro', 'New Bath Today', 'Kohler', 'Long Home',
        'BathWorks of Michigan', 'CareFree Home Pros', 'Billy.com', 'Crowther Roofing and Cooling',
        'Advanced Roofing, Inc.', 'American Remodeling', 'Anderson Windows', 'Baker Roofing Company',
        'Best Choice Roofing', 'Bone Dry Roofing', 'Centimark Corporation', 'Corey Construction',
        'Crown Roofing & Waterproofing', 'Erie', 'GreenWatt Consulting LLC', 'Greenwood Industries, Inc.',
        'Home Genius Exteriors', 'Infinity Home Services', 'Jolly Roofing & Contracting Company, Inc.',
        'Kalkreuth Roofing and Sheet Metal', 'Legacy Restoration', 'Nations Roof', 'O’Hara’s Son Roofing Company',
        'Pointer Leads', 'RestoreMasters', 'Roofing Corp of America', 'Stronghouse Solutions', 'Tecta America',
        'CCX Roofing', 'Cody Clinger’s Roofing', 'Victory Home Remodeling', 'Clear Choice Home Improvement',
        'New Pro', 'Home Genius Exteriors', 'Long Home', 'Roofix Technologies LLC',
        'Breezy Roofing powered by Roofix.', 'Breezy Roofing LLC', 'Future Remodeling', 'DaBella',
        'Continental Siding', 'New Pro Home Remodeling', 'C Michael Exteriors', 'Victory Home Remodeling',
        'Champion Siding', 'Home Genius Exteriors', 'Capital Construction Contracting', 'Home Genius Exteriors',
        'Future Remodeling'
      ]
    },

    es: {
      // Versión en español disponible si lo necesitas
      title: 'Socios en Servicios para el Hogar',
      subtitle:
        'Zarate Marketing, la empresa matriz de Best Deal Roofing, ha establecido alianzas estratégicas en todo Estados Unidos con proveedores de seguros, consultores solares y líderes en mejoras del hogar. Gracias a esta red poderosa, ofrecemos a nuestros clientes acceso sin precedentes a las mejores ofertas en techado y energía solar.',
      partners: [] // Puedes traducir la lista si lo deseas
    }
  };

  const t = content[language];

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">{t.title}</h1>
      <p className="text-center mb-10 text-lg max-w-3xl mx-auto">{t.subtitle}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {t.partners.map((partner, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 text-center hover:shadow-md transition"
          >
            <p className="text-gray-700 font-medium">{partner}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
