'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getFormEndpoint } from '@/lib/formConfig';

declare global {
  interface Window {
    TrustedForm?: {
      getCertUrl?: () => string;
    };
    dataLayer?: Record<string, unknown>[];
    jornaya_lead_id?: string;
    leadid_token?: string;
    jornayaLeadId?: string;
    leadId?: string;
    jornaya_token?: string;
  }
}

export default function Form() {
  const { language } = useLanguage();
  const router = useRouter();
  
  // Log para verificar cuántas instancias se montan
  useEffect(() => {
    console.log('🔧 Form component mounted - timestamp:', new Date().toISOString());
    return () => {
      console.log('🔧 Form component unmounted - timestamp:', new Date().toISOString());
    };
  }, []);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email_address: '',
    phone_home: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    repair_or_replace: '',
    ownership: '',
    bathroomStyle: '',
    customBathroomStyle: '',
    urgency: '',
    customUrgency: '',
    tcpaText: '',
    trusted_form_cert_id: '',
    landing_page: '',
    universal_leadid: '',
  });

  const [isNotEligible, setIsNotEligible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage] = useState('');
  const [tfToken, setTfToken] = useState('');
  const tfHiddenRef = useRef<HTMLInputElement>(null);
  const hasSubmitted = useRef(false); // Prevenir envíos duplicados
  const formRef = useRef<HTMLFormElement>(null);
  const [zipCodeError, setZipCodeError] = useState('');

  // Lista de códigos postales autorizados (sin duplicados)
  const authorizedZipCodes = new Set([
    '36439', '36482', '36505', '36518', '36521', '36523', '36525', '36526', '36527', '36528', '36529', '36530', '36532', '36535', '36541', '36542', '36549', '36551', '36553', '36555', '36561', '36567', '36571', '36572', '36574', '36575', '36576', '36577', '36578', '36579', '36580', '36581', '36582', '36585', '36587', '36602', '36604', '36608', '36609', '36619', '36693', '36695',
    '85001', '85002', '85003', '85004', '85005', '85006', '85007', '85008', '85009', '85010', '85011', '85012', '85013', '85014', '85015', '85016', '85017', '85018', '85019', '85020', '85021', '85022', '85023', '85024', '85026', '85027', '85028', '85029', '85030', '85031', '85032', '85033', '85034', '85035', '85036', '85037', '85038', '85039', '85040', '85041', '85042', '85043', '85044', '85045', '85046', '85048', '85050', '85051', '85053', '85054', '85060', '85061', '85062', '85063', '85064', '85065', '85066', '85067', '85068', '85069', '85070', '85071', '85072', '85073', '85074', '85075', '85076', '85078', '85079', '85080', '85082', '85083', '85085', '85086', '85087',
    '85117', '85118', '85119', '85120', '85121', '85122', '85123', '85127', '85128', '85130', '85131', '85132', '85135', '85137', '85138', '85139', '85140', '85142', '85143', '85147', '85172', '85173', '85178', '85190', '85191', '85193', '85194',
    '85201', '85202', '85203', '85204', '85205', '85206', '85207', '85208', '85209', '85210', '85211', '85212', '85213', '85214', '85215', '85216', '85224', '85225', '85226', '85233', '85234', '85236', '85242', '85244', '85246', '85248', '85249', '85250', '85251', '85252', '85253', '85254', '85255', '85256', '85257', '85258', '85259', '85260', '85261', '85262', '85263', '85264', '85266', '85267', '85268', '85269', '85271', '85274', '85275', '85277', '85280', '85281', '85282', '85283', '85284', '85285', '85286', '85287', '85295', '85296', '85297', '85298', '85299',
    '85301', '85302', '85303', '85304', '85305', '85306', '85307', '85308', '85309', '85310', '85311', '85312', '85318', '85320', '85322', '85323', '85324', '85326', '85327', '85329', '85331', '85332', '85335', '85337', '85338', '85339', '85340', '85342', '85343', '85345', '85351', '85353', '85354', '85355', '85358', '85361', '85362', '85363', '85372', '85373', '85374', '85375', '85376', '85377', '85378', '85379', '85380', '85381', '85382', '85383', '85385', '85387', '85388', '85390', '85392', '85395', '85396',
    '85501', '85502', '85532', '85539', '85541', '85544', '85545', '85547', '85553', '85554',
    '86303', '86322', '86327', '86329', '86332', '86333', '86343',
    '94503', '94509', '94510', '94513', '94517', '94518', '94519', '94520', '94521', '94522', '94523', '94524', '94527', '94529', '94530', '94531', '94533', '94534', '94536', '94537', '94538', '94539', '94546', '94547', '94549', '94552', '94553', '94555', '94558', '94559', '94560', '94561', '94564', '94565', '94577', '94578', '94579', '94580', '94581', '94585', '94586', '94589', '94590', '94591', '94592', '94595', '94596', '94597', '94598',
    '94801', '94802', '94803', '94804', '94805', '94806', '94807', '94808', '94820', '94850',
    '94926', '94927', '94928', '94945', '94947', '94948', '94949', '94952', '94953', '94954', '94955', '94975', '94998', '94999',
    '95401', '95402', '95403', '95404', '95405', '95406', '95407', '95409',
    '95687', '95688', '95696',
    '80001', '80002', '80003', '80004', '80005', '80006', '80007', '80010', '80011', '80012', '80013', '80014', '80015', '80016', '80017', '80018', '80019', '80020', '80021', '80022', '80023', '80024', '80025', '80026', '80027', '80030', '80031', '80033', '80034', '80035', '80036', '80037', '80038', '80040', '80041', '80042', '80044', '80045', '80046', '80047',
    '80101', '80102', '80103', '80104', '80105', '80106', '80107', '80108', '80109', '80110', '80111', '80112', '80113', '80116', '80117', '80118', '80120', '80121', '80122', '80123', '80124', '80125', '80126', '80127', '80128', '80129', '80130', '80131', '80132', '80133', '80134', '80135', '80136', '80137', '80138', '80150', '80151', '80155', '80160', '80161', '80162', '80163', '80165', '80166',
    '80201', '80202', '80203', '80204', '80205', '80206', '80207', '80208', '80209', '80210', '80211', '80212', '80214', '80215', '80216', '80217', '80218', '80219', '80220', '80221', '80222', '80223', '80224', '80225', '80226', '80227', '80228', '80229', '80230', '80231', '80232', '80233', '80234', '80235', '80236', '80237', '80238', '80239', '80241', '80243', '80246', '80247', '80248', '80249', '80250', '80256', '80257', '80259', '80260', '80261', '80263', '80264', '80265', '80266', '80271', '80273', '80274', '80281', '80290', '80291', '80293', '80294', '80299',
    '80301', '80302', '80303', '80304', '80305', '80306', '80307', '80308', '80309', '80310', '80314',
    '80401', '80402', '80403', '80419', '80425', '80433', '80437', '80439', '80453', '80454', '80455', '80457', '80465', '80466', '80470', '80471', '80481',
    '80501', '80502', '80503', '80516', '80533', '80540', '80544',
    '80601', '80602', '80614', '80640',
    '80809', '80817', '80819', '80829', '80830', '80831', '80835',
    '80901', '80903', '80904', '80905', '80906', '80907', '80908', '80909', '80910', '80912', '80915', '80916', '80917', '80918', '80919', '80920', '80922', '80923', '80925', '80927', '80928', '80929', '80930', '80932', '80933', '80934', '80935', '80936', '80937', '80938', '80939', '80941', '80942', '80946', '80947', '80949', '80950', '80951', '80960', '80962', '80970', '80977', '80995', '80997',
    // Códigos adicionales que faltaban
    '24649', '97002'
  ]);

  // TrustedForm integration
  useEffect(() => {
    if (!tfHiddenRef.current) return;
    
    // Set landing page
    setForm(prev => ({ ...prev, landing_page: window.location.href }));
    
    const applyFromGlobal = () => {
      try {
        const val = (window.TrustedForm && window.TrustedForm.getCertUrl && window.TrustedForm.getCertUrl()) || '';
        if (val) {
          if (tfHiddenRef.current) tfHiddenRef.current.value = val;
          setTfToken(val);
          setForm(prev => ({ ...prev, trusted_form_cert_id: val }));
        }
      } catch {}
    };
    
    applyFromGlobal();
    
    const obs = new MutationObserver(() => {
      if (tfHiddenRef.current?.value) {
        setTfToken(tfHiddenRef.current.value);
        setForm(prev => ({ ...prev, trusted_form_cert_id: tfHiddenRef.current?.value || '' }));
      }
    });
    
    obs.observe(tfHiddenRef.current, { attributes: true, attributeFilter: ['value'] });
    const id = setInterval(applyFromGlobal, 300);
    
    return () => { obs.disconnect(); clearInterval(id); };
  }, []);

  // Jornaya LeadID integration: observar y registrar cambios del token
  useEffect(() => {
    const input = document.getElementById('leadid_token') as HTMLInputElement | null;
    if (!input) return;

    const logCurrent = () => {
      if (input && input.value) {
        console.log('🔎 Jornaya lead token detectado:', input.value);
      } else {
        console.log('⌛ Jornaya lead token aún no disponible');
      }
    };

    // Log inicial y cada cambio del atributo value
    logCurrent();
    const observer = new MutationObserver(() => {
      console.log('✳️ Cambio detectado en leadid_token:', input.value);
    });
    observer.observe(input, { attributes: true, attributeFilter: ['value'] });

    // Poll suave por si el script actualiza por JS sin mutación de atributo
    const intervalId = setInterval(logCurrent, 500);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  // Función para validar código postal
  const validateZipCode = (zipCode: string): boolean => {
    const cleanZip = zipCode.trim();
    return authorizedZipCodes.has(cleanZip);
  };

  // Función para Jornaya Lead ID - EXACTA del patrón exitoso con debug
  async function waitForJornayaToken(maxWaitMs = 2000) {
    const start = Date.now()
    const poll = async (): Promise<string> => {
      const leadIdInput = document.getElementById('leadid_token') as HTMLInputElement
      const val = leadIdInput?.value || ''
      console.log('🔍 Jornaya token polling:', val) // DEBUG
      if (val) {
        return val
      }
      if (Date.now() - start >= maxWaitMs) return ''
      await new Promise(r => setTimeout(r, 150))
      return poll()
    }
    return poll()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));

    if (name === 'ownership') {
      if (value === 'no') {
        setIsNotEligible(true);
        alert(language === 'es'
          ? 'Lo sentimos, este formulario es solo para propietarios de vivienda.'
          : 'Sorry, this form is only for homeowners.');
      } else {
        setIsNotEligible(false);
      }
    }
  };

  async function waitForTrustedFormToken(maxWaitMs = 2000) {
    const start = Date.now();
    const poll = async (): Promise<string> => {
      const hiddenVal = tfHiddenRef.current?.value || '';
      let fromApi = '';
      try { 
        fromApi = (window.TrustedForm && window.TrustedForm.getCertUrl && window.TrustedForm.getCertUrl()) || '';
      } catch {}
      
      const val = hiddenVal || fromApi;
      if (val) {
        if (!hiddenVal && tfHiddenRef.current) tfHiddenRef.current.value = val;
        setTfToken(val);
        setForm(prev => ({ ...prev, trusted_form_cert_id: val }));
        return val;
      }
      
      if (Date.now() - start >= maxWaitMs) return '';
      await new Promise(r => setTimeout(r, 150));
      return poll();
    };
    return poll();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevenir envíos duplicados
    if (hasSubmitted.current || isSubmitting) {
      console.log('🚫 Form submission blocked - already submitted or submitting');
      return;
    }
    
    // Validar código postal antes de continuar
    if (!validateZipCode(form.zip_code)) {
      setZipCodeError(language === 'es' ? 'Fuera de cobertura' : 'Out of coverage area');
      return;
    }
    
    console.log('🚀 Form submission started');
    hasSubmitted.current = true;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    const formEl = e.currentTarget as HTMLFormElement;
    
    // ESPERAR AMBOS TOKENS ANTES DE CONTINUAR
    console.log('⏳ Esperando TrustedForm token...');
    await waitForTrustedFormToken(2000);
    
    console.log('⏳ Esperando Jornaya token...');
    const jornayaToken = await waitForJornayaToken(2000);
    console.log('🔍 Jornaya token final:', jornayaToken);
    
    const f = new FormData(formEl);
    
    // VERIFICAR QUE EL TOKEN ESTÉ EN FormData
    const formDataJornaya = f.get('universal_leadid')?.toString() || '';
    console.log('🔍 Jornaya desde FormData:', formDataJornaya); // DEBUG

    try {
      // Set TCPA text
      const tcpaText = 'By clicking Submit, You agree to give express consent to receive marketing communications regarding Home Improvement services by automatic dialing system and pre-recorded calls and artificial voice messages from Home Services Partners at the phone number and E-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on the Do not Call Registry. SMS/MMS and data messaging rates may apply. You understand that my consent here is not a condition for buying any goods or services. You agree to the Privacy Policy and Terms & Conditions.';
      
      // Normalización de campos derivados
      const normalizedBathroomStyle = form.bathroomStyle === 'other' ? form.customBathroomStyle : form.bathroomStyle;
      const normalizedUrgency = form.urgency === 'other' ? form.customUrgency : form.urgency;

      // Payload completo según patrón exitoso
      const payload = {
        // Campaign fields
        lp_campaign_id: process.env.NEXT_PUBLIC_LP_CAMPAIGN_ID || 'Provided',
        lp_campaign_key: process.env.NEXT_PUBLIC_LP_CAMPAIGN_KEY || 'Provided', 
        lp_s1: process.env.NEXT_PUBLIC_LP_S1 || 'Provided',
        lp_s2: process.env.NEXT_PUBLIC_LP_S2 || 'toptierbathpros',
        lp_response: 'JSON',
        
        // Contact and address data
        city: form.city,
        state: form.state,
        zip_code: form.zip_code,
        first_name: form.first_name,
        last_name: form.last_name,
        address: form.address,
        phone_home: form.phone_home,
        email_address: form.email_address,
        
        // Service and consent
        repair_or_replace: form.repair_or_replace,
        tcpaText: tcpaText,
        "consent-language": true,
        
        // Tracking and metadata - EXACTO DEL PATRÓN EXITOSO
        trusted_form_cert_id: (tfHiddenRef.current?.value || tfToken || f.get('trusted_form_cert_id')?.toString() || ''),
        jornaya_lead_id: jornayaToken || formDataJornaya, // USAR TOKEN CAPTURADO PRIMERO, LUEGO FormData
        landing_page: form.landing_page || window.location.href,
        
        // Legacy fields for compatibility
        bathroomStyle: normalizedBathroomStyle,
        urgency: normalizedUrgency,
        ownership: form.ownership,
        timestamp: new Date().toISOString(),
        source: 'TOPTIER BATH PROS Website',
        language,
        website: 'toptierbathpros.com',
      };

      console.log('🔍 Payload completo antes de enviar:', payload); // DEBUG
      console.log('🔍 Token Jornaya final en payload:', payload.jornaya_lead_id); // DEBUG ADICIONAL

      // Enviar a Zapier Webhook (formato JSON para mejor organización)
      const response = await fetch(getFormEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('✅ Form submitted successfully');
        console.log('✅ Jornaya token enviado exitosamente:', payload.jornaya_lead_id);
        
        // Disparar Custom Event para GTM (solo una vez)
        if (typeof window !== 'undefined' && window.dataLayer) {
          const eventData = {
            event: 'lead_submit',
            form_id: 'toptier_bath_pros_form',
            form_type: 'bathroom_remodeling_quote',
            lead_data: {
              first_name: form.first_name,
              last_name: form.last_name,
              email: form.email_address,
              phone: form.phone_home,
              service: form.repair_or_replace,
              zip_code: form.zip_code
            }
          };
          
          window.dataLayer.push(eventData);
          console.log('✅ Custom GTM event pushed: lead_submit');
          console.log('📊 Event data:', eventData);
          console.log('📊 Total dataLayer events:', window.dataLayer.length);
        } else {
          console.log('❌ dataLayer not available');
        }
        
        // Éxito - redirigir a página de agradecimiento
        router.push('/thankyou');
      } else {
        // Si falla, redirigir de todas formas (para testing)
        console.log('Zapier webhook failed, but continuing to thank you page');
        router.push('/thankyou');
      }

    } catch (error) {
      // En caso de error, redirigir a página de agradecimiento
      console.log('Form submission error:', error);
      hasSubmitted.current = false; // Reset para permitir reintento según patrón exitoso
      router.push('/thankyou');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return form.first_name.trim() !== '' &&
           form.last_name.trim() !== '' &&
           form.email_address.trim() !== '' &&
           form.phone_home.trim() !== '' &&
           form.address.trim() !== '' &&
           form.city.trim() !== '' &&
           form.state.trim() !== '' &&
           form.zip_code.trim() !== '' &&
           validateZipCode(form.zip_code) && // Validar que el código postal esté autorizado
           form.repair_or_replace !== '' &&
           true; // No checkbox required
  };

  if (isNotEligible) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {language === 'es' ? 'No Elegible' : 'Not Eligible'}
        </h2>
        <p className="text-gray-700 mb-6">
          {language === 'es'
            ? 'Lo sentimos, este formulario es solo para propietarios de vivienda.' 
            : 'Sorry, this form is only for homeowners.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3" data-tf-element-role="offer">
        {/* Hidden TrustedForm field */}
        <input ref={tfHiddenRef} type="hidden" name="trusted_form_cert_id" />
        
        {/* Hidden Jornaya Lead ID field (sin value para permitir escritura del script) */}
        <input id="leadid_token" type="hidden" name="universal_leadid" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'es' ? 'Nombre' : 'First Name'} *
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Tu nombre' : 'Your first name'}
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Apellido' : 'Last Name'} *
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Tu apellido' : 'Your last name'}
            />
          </div>

          <div>
            <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Correo Electrónico' : 'Email'} *
            </label>
            <input
              type="email"
              id="email_address"
              name="email_address"
              value={form.email_address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone_home" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Teléfono' : 'Phone'} *
            </label>
            <input
              type="tel"
              id="phone_home"
              name="phone_home"
              value={form.phone_home}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Tu número de teléfono' : 'Your phone number'}
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'es' ? 'Dirección' : 'Address'} *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder={language === 'es' ? 'Tu dirección completa' : 'Your complete address'}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Ciudad' : 'City'} *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Ciudad' : 'City'}
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Estado' : 'State'} *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Estado' : 'State'}
            />
          </div>

          <div>
            <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Código Postal' : 'ZIP Code'} *
            </label>
            <input
              type="text"
              id="zip_code"
              name="zip_code"
              value={form.zip_code}
              onChange={(e) => {
                handleChange(e);
                // Validar código postal en tiempo real
                const zipCode = e.target.value.trim();
                if (zipCode && !validateZipCode(zipCode)) {
                  setZipCodeError(language === 'es' ? 'Fuera de cobertura' : 'Out of coverage area');
                } else {
                  setZipCodeError('');
                }
              }}
              required
              className={`w-full border rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                zipCodeError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="12345"
            />
            {zipCodeError && (
              <p className="mt-1 text-sm text-red-600">{zipCodeError}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {language === 'es' ? 'Servicio de Interés' : 'Service of Interest'} *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="repair_or_replace"
                value="repair"
                checked={form.repair_or_replace === 'repair'}
                onChange={handleChange}
                className="mr-3 text-teal-500 focus:ring-teal-500"
              />
              <span>{language === 'es' ? 'Reparar baño existente' : 'Repair existing bathroom'}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="repair_or_replace"
                value="replace"
                checked={form.repair_or_replace === 'replace'}
                onChange={handleChange}
                className="mr-3 text-teal-500 focus:ring-teal-500"
              />
              <span>{language === 'es' ? 'Reemplazar/Remodelar baño completo' : 'Replace/Remodel complete bathroom'}</span>
            </label>
          </div>
        </div>

        {submitStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {submitMessage}
          </div>
        )}

        <label className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-3 block" data-tf-element-role="consent-language">
          <span className="text-xs leading-relaxed text-gray-700">
            By clicking Submit, You agree to give express consent to receive marketing communications regarding Home Improvement services by automatic dialing system and pre-recorded calls and artificial voice messages from <Link href="/partners" className="underline text-teal-600 hover:text-teal-800">Home Services Partners</Link> at the phone number and E-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on the Do not Call Registry. SMS/MMS and data messaging rates may apply. You understand that my consent here is not a condition for buying any goods or services. You agree to the{' '}
            <a className="underline" href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a> and{' '}
            <a className="underline ml-1" href="/terms-conditions" target="_blank" rel="noreferrer">Terms & Conditions</a>.
          </span>
        </label>

        <input
          type="submit"
          name="submit"
          data-tf-element-role="submit"
          disabled={!isFormValid() || isSubmitting}
          className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-sm cursor-pointer"
          value={isSubmitting ? (language === 'es' ? 'Enviando...' : 'Submitting...') : 'Submit'}
        />
      </form>
    </div>
  );
}