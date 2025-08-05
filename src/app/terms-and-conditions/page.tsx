'use client';

import { useLanguage } from '../../context/LanguageContext';

export default function TermsPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Terms & Conditions',
      effectiveDate: 'Effective Date: July 2025',
      intro: `Welcome to Best Deal Roofing. By accessing or using our website, submitting a form, or engaging with our services in any way, you agree to be legally bound by the following terms and conditions. Please read them carefully before proceeding. If you do not agree with these terms, please do not use our services.`,
      termsTitle: 'Terms of Use',
      terms: [
        'You must be at least 18 years of age or have the consent of a parent or guardian to use our services.',
        'All service requests and project estimates are subject to eligibility, availability, and verification.',
        'Any pricing or promotional offers provided are non-binding until confirmed through a signed written agreement.',
        'We reserve the right to modify or discontinue any part of our website or services without notice.',
        'You agree to provide accurate and complete information during any form submission or communication.'
      ],
      communicationsTitle: 'Consent to Communications',
      communications: [
        'By submitting a form, you consent to receive communications from Best Deal Roofing and its partners via phone calls, text messages (SMS), and email.',
        'These communications may be for scheduling, providing information, promotional offers, or follow-ups.',
        'Message and data rates may apply depending on your carrier.'
      ],
      liabilityTitle: 'Limitation of Liability',
      liability: [
        'Best Deal Roofing is not responsible for any indirect, incidental, or consequential damages arising from your use of our website or services.',
        'We do not guarantee uninterrupted or error-free access to the website.',
        'All services are provided "as is" without warranties unless otherwise stated in a written contract.'
      ],
      privacyTitle: 'Privacy & Data Handling',
      privacy: [
        'Your personal information will be handled in accordance with our Privacy Policy.',
        'We implement security measures to protect your data but cannot guarantee absolute security of electronic transmissions.',
        'We may share your information with trusted partners solely for service provision and marketing purposes.'
      ],
      contact: 'If you have any questions regarding these terms and conditions, please contact us at team@bestdealroofing.xyz.',
    },

    es: {
      title: 'Términos y Condiciones',
      effectiveDate: 'Fecha de Entrada en Vigencia: Julio 2025',
      intro: `Bienvenido a Best Deal Roofing. Al acceder o utilizar nuestro sitio web, enviar un formulario o interactuar con nuestros servicios, usted acepta estar legalmente sujeto a los siguientes términos y condiciones. Por favor, léalos cuidadosamente. Si no está de acuerdo con ellos, absténgase de usar nuestros servicios.`,
      termsTitle: 'Condiciones de Uso',
      terms: [
        'Debe tener al menos 18 años de edad o contar con el consentimiento de un padre o tutor para utilizar nuestros servicios.',
        'Todas las solicitudes de servicio y cotizaciones están sujetas a elegibilidad, disponibilidad y verificación.',
        'Cualquier precio u oferta promocional proporcionada no es vinculante hasta que se confirme mediante un contrato firmado.',
        'Nos reservamos el derecho de modificar o suspender cualquier parte de nuestro sitio web o servicios sin previo aviso.',
        'Usted acepta proporcionar información precisa y completa en cualquier formulario o comunicación.'
      ],
      communicationsTitle: 'Consentimiento para Comunicaciones',
      communications: [
        'Al enviar un formulario, usted acepta recibir comunicaciones de Best Deal Roofing y sus socios por llamadas telefónicas, mensajes de texto (SMS) y correo electrónico.',
        'Estas comunicaciones pueden incluir programación, información, ofertas promocionales o seguimientos.',
        'Pueden aplicarse tarifas por mensajes y datos según su operador.'
      ],
      liabilityTitle: 'Limitación de Responsabilidad',
      liability: [
        'Best Deal Roofing no se hace responsable de daños indirectos, incidentales o consecuentes que resulten del uso de nuestro sitio web o servicios.',
        'No garantizamos el acceso ininterrumpido o libre de errores al sitio web.',
        'Todos los servicios se proporcionan "tal cual" sin garantías, a menos que se establezca lo contrario por escrito.'
      ],
      privacyTitle: 'Privacidad y Manejo de Datos',
      privacy: [
        'Su información personal será manejada conforme a nuestra Política de Privacidad.',
        'Implementamos medidas de seguridad para proteger sus datos, pero no podemos garantizar la seguridad total de las transmisiones electrónicas.',
        'Podemos compartir su información con socios confiables únicamente para fines de prestación de servicios y marketing.'
      ],
      contact: 'Si tiene preguntas sobre estos términos y condiciones, contáctenos en team@bestdealroofing.xyz.',
    }
  };

  const t = content[language];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
      <p className="text-sm text-gray-600 mb-6">{t.effectiveDate}</p>
      <p className="mb-6">{t.intro}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t.termsTitle}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {t.terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t.communicationsTitle}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {t.communications.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t.liabilityTitle}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {t.liability.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t.privacyTitle}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {t.privacy.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-gray-700">{t.contact}</p>
    </main>
  );
}
