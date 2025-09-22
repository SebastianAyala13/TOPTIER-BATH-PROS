// Script de prueba para verificar el comportamiento del formulario
// Ejecutar en la consola del navegador en http://localhost:3000

console.log('🧪 Iniciando pruebas del formulario...');

// Función para llenar el formulario
function fillForm() {
  console.log('📝 Llenando formulario...');
  
  // Buscar el formulario activo (móvil o desktop)
  const form = document.querySelector('#lead-form-mobile form, #lead-form-desktop form');
  if (!form) {
    console.log('❌ No se encontró el formulario');
    return false;
  }
  
  console.log('✅ Formulario encontrado:', form.id || 'sin ID');
  
  // Llenar campos
  const fields = {
    'first_name': 'Test',
    'last_name': 'User',
    'email_address': 'test@example.com',
    'phone_home': '555-1234',
    'address': '123 Test St',
    'city': 'Test City',
    'state': 'TS',
    'zip_code': '12345'
  };
  
  Object.entries(fields).forEach(([name, value]) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      console.log(`✅ Campo ${name} llenado: ${value}`);
    } else {
      console.log(`❌ Campo ${name} no encontrado`);
    }
  });
  
  // Seleccionar servicio
  const serviceRadio = form.querySelector('[name="repair_or_replace"][value="replace"]');
  if (serviceRadio) {
    serviceRadio.checked = true;
    serviceRadio.dispatchEvent(new Event('change', { bubbles: true }));
    console.log('✅ Servicio seleccionado: replace');
  }
  
  return true;
}

// Función para verificar dataLayer
function checkDataLayer() {
  console.log('📊 Verificando dataLayer...');
  console.log('📊 Total eventos:', window.dataLayer?.length || 0);
  
  const leadSubmitEvents = window.dataLayer?.filter(item => item.event === 'lead_submit') || [];
  console.log('🎯 Eventos lead_submit:', leadSubmitEvents.length);
  
  leadSubmitEvents.forEach((event, index) => {
    console.log(`📋 Evento ${index + 1}:`, event);
  });
  
  return leadSubmitEvents.length;
}

// Función para limpiar dataLayer
function clearDataLayer() {
  console.log('🧹 Limpiando dataLayer...');
  window.dataLayer = [];
  console.log('✅ DataLayer limpiado');
}

// Función para simular envío
function simulateSubmit() {
  console.log('🚀 Simulando envío del formulario...');
  
  const form = document.querySelector('#lead-form-mobile form, #lead-form-desktop form');
  if (!form) {
    console.log('❌ No se encontró el formulario');
    return;
  }
  
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    console.log('✅ Botón de envío encontrado, haciendo click...');
    submitButton.click();
  } else {
    console.log('❌ Botón de envío no encontrado');
  }
}

// Función principal de prueba
function runTest() {
  console.log('🧪 === INICIANDO PRUEBA COMPLETA ===');
  
  // Limpiar dataLayer
  clearDataLayer();
  
  // Llenar formulario
  if (!fillForm()) {
    console.log('❌ No se pudo llenar el formulario');
    return;
  }
  
  // Esperar un poco y verificar dataLayer antes del envío
  setTimeout(() => {
    console.log('📊 DataLayer antes del envío:');
    checkDataLayer();
    
    // Simular envío
    simulateSubmit();
    
    // Verificar dataLayer después del envío
    setTimeout(() => {
      console.log('📊 DataLayer después del envío:');
      const eventCount = checkDataLayer();
      
      if (eventCount === 1) {
        console.log('✅ ÉXITO: Solo se disparó 1 evento lead_submit');
      } else if (eventCount === 0) {
        console.log('⚠️ ADVERTENCIA: No se disparó ningún evento');
      } else {
        console.log('❌ ERROR: Se dispararon múltiples eventos:', eventCount);
      }
      
      console.log('🧪 === PRUEBA COMPLETADA ===');
    }, 2000);
  }, 1000);
}

// Exportar funciones para uso manual
window.testForm = {
  fillForm,
  checkDataLayer,
  clearDataLayer,
  simulateSubmit,
  runTest
};

console.log('🔧 Funciones de prueba disponibles:');
console.log('- testForm.runTest() - Ejecutar prueba completa');
console.log('- testForm.fillForm() - Llenar formulario');
console.log('- testForm.checkDataLayer() - Verificar dataLayer');
console.log('- testForm.clearDataLayer() - Limpiar dataLayer');
console.log('- testForm.simulateSubmit() - Simular envío');
