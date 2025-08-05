'use client';

import { useLanguage } from '../../context/LanguageContext';

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Privacy Policy',
      effectiveDate: 'Effective Date: July 2025',
      intro: `At Best Deal Roofing ("we", "our", or "us"), your privacy is of utmost importance. This Privacy Policy outlines how we collect, use, share, and protect your information when you interact with our website or request our services.`,
      infoCollectedTitle: '1. Information We Collect',
      infoCollected: [
        'Personal information provided voluntarily, such as your name, email address, phone number, ZIP code, and service preferences.',
        'Automatically collected data such as IP address, browser type, pages visited, and time spent on site via cookies or analytics tools.'
      ],
      useOfInfoTitle: '2. How We Use Your Information',
      useOfInfo: [
        'To respond to inquiries, schedule consultations, and deliver roofing services.',
        'To send you relevant promotions, service updates, and important announcements.',
        'To improve our website performance and user experience.'
      ],
      legalBasisTitle: '3. Legal Basis for Processing (if applicable)',
      legalBasis: [
        'Your consent (when submitting forms).',
        'The necessity of processing for service delivery.',
        'Compliance with legal obligations.'
      ],
      dataRetentionTitle: '4. Data Retention and Security',
      dataRetention: [
        'Your data is retained only for as long as necessary to fulfill the purpose it was collected for.',
        'We implement security measures to prevent unauthorized access, disclosure, or loss.'
      ],
      sharingTitle: '5. Sharing Your Information',
      sharing: [
        'We do not sell your personal data.',
        'We may share your information with trusted contractors, service providers, or legal authorities if required.',
        'All partners are contractually obligated to protect your data.'
      ],
      yourRightsTitle: '6. Your Privacy Rights',
      yourRights: [
        'You have the right to access, update, or request deletion of your personal information.',
        'To exercise these rights, email us at team@bestdealroofing.xyz.'
      ],
      disclaimer: 'If you do not agree with our Privacy Policy, we recommend you do not use our site or submit your personal information.',
    },

    es: {
      title: 'Política de Privacidad',
      effectiveDate: 'Fecha Efectiva: Julio 2025',
      intro: `En Best Deal Roofing ("nosotros", "nuestro" o "nos"), su privacidad es de suma importancia. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su información cuando interactúa con nuestro sitio web o solicita nuestros servicios.`,
      infoCollectedTitle: '1. Información que Recopilamos',
      infoCollected: [
        'Información personal que usted proporciona voluntariamente, como nombre, correo electrónico, número de teléfono, código postal y preferencias de servicio.',
        'Datos recopilados automáticamente como dirección IP, tipo de navegador, páginas visitadas y tiempo en el sitio mediante cookies o herramientas de análisis.'
      ],
      useOfInfoTitle: '2. Cómo Usamos su Información',
      useOfInfo: [
        'Para responder consultas, programar citas y brindar servicios de techado.',
        'Para enviarle promociones relevantes, actualizaciones de servicios y anuncios importantes.',
        'Para mejorar el rendimiento del sitio web y la experiencia del usuario.'
      ],
      legalBasisTitle: '3. Base Legal para el Tratamiento (si aplica)',
      legalBasis: [
        'Su consentimiento (al enviar formularios).',
        'La necesidad de procesar para la prestación del servicio.',
        'Cumplimiento de obligaciones legales.'
      ],
      dataRetentionTitle: '4. Retención y Seguridad de los Datos',
      dataRetention: [
        'Sus datos se conservan solo durante el tiempo necesario para cumplir con el propósito para el que fueron recopilados.',
        'Implementamos medidas de seguridad para prevenir accesos no autorizados, divulgación o pérdida de datos.'
      ],
      sharingTitle: '5. Compartir su Información',
      sharing: [
        'No vendemos su información personal.',
        'Podemos compartir su información con contratistas confiables, proveedores de servicios o autoridades legales si es requerido.',
        'Todos los socios están obligados contractualmente a proteger su información.'
      ],
      yourRightsTitle: '6. Sus Derechos de Privacidad',
      yourRights: [
        'Tiene derecho a acceder, actualizar o solicitar la eliminación de su información personal.',
        'Para ejercer estos derechos, envíenos un correo a team@bestdealroofing.xyz.'
      ],
      disclaimer: 'Si no está de acuerdo con esta Política de Privacidad, le recomendamos que no use nuestro sitio ni envíe su información personal.',
    }
  };

  const t = content[language];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
      <p className="text-sm text-gray-600 mb-6">{t.effectiveDate}</p>
      <p className="mb-6">{t.intro}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t.infoCollectedTitle}</h2>
        <ul className="list-disc pl-6 space-y-2">
          {t.infoCollected.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t.useOfInfoTitle}</h2>
        <ul className="list-disc pl-6 space-y-2">
          {t.useOfInfo.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t.legalBasisTitle}</h2>
        <ul className="list-disc pl-6 space-y-2">
          {t.legalBasis.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t.dataRetentionTitle}</h2>
        <ul className="list-disc pl-6 space-y-2">
          {t.dataRetention.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t.sharingTitle}</h2>
        <ul className="list-disc pl-6 space-y-2">
          {t.sharing.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t.yourRightsTitle}</h2>
        <ul className="list-disc pl-6 space-y-2">
          {t.yourRights.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <p className="mt-8">{t.disclaimer}</p>
    </main>
  );
}
