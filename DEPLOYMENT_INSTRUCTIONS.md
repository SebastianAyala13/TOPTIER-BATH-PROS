# 🚀 Instrucciones de Despliegue - TOPTIER BATH PROS

## ✅ Proyecto Convertido a 100% Estático

El proyecto ha sido exitosamente convertido para funcionar como sitio estático en Hostinger.

## � Actualizar ZIP Codes Autorizados

Los ZIP codes permitidos en los formularios se almacenan en `src/lib/authorizedZipCodes.ts` y provienen de un archivo Excel.

### **Procedimiento para Actualizar:**

#### 1. **Preparar el archivo Excel**
- Abre el archivo .xlsx que contiene los datos
- Navega a la hoja **"Zips-Bath"**
- Verifica que la columna **F** (Zips exl landing) contenga los códigos ZIP

#### 2. **Colocar el archivo en la carpeta del proyecto**
```bash
# Copia el .xlsx a la raíz del proyecto o en una carpeta data/
cp /ruta/al/archivo.xlsx ./data/zipcodes.xlsx
```

#### 3. **Ejecutar el script generador**
```bash
# El script leerá Excel y generará src/lib/authorizedZipCodes.ts
npm run update:zips -- data/zipcodes.xlsx
```

O si prefieres usar Python directamente:
```bash
python scripts/generate_authorized_zip_codes.py data/zipcodes.xlsx
```

#### 4. **Validar los cambios**
```bash
# Revisar el diff del archivo generado
git diff src/lib/authorizedZipCodes.ts

# Verificar que la sintaxis TypeScript es válida
npm run lint

# Hacer un build para asegurar compatibilidad
npm run build
```

#### 5. **Probar en la interfaz**
- Ingresa un ZIP code válido en cualquiera de los formularios (Form.tsx, formulario/page.tsx o freshbathremodel/ page.tsx)
- Verifica que se acepte
- Ingresa un ZIP code inválido y verifica que muestre error

#### 6. **Desplegar**
```bash
npm run build
# Subir los cambios a producción (ver secciones de despliegue abajo)
```

### **Notas Técnicas**

- El script usa **openpyxl** para leer Excel. Si no está instalado:
  ```bash
  pip install openpyxl
  ```
- El script **automáticamente**:
  - Elimina duplicados
  - Normaliza ZIP codes a 5 dígitos
  - Ordena la lista alfabéticamente
  - Valida la hoja y columna esperadas
- Salida esperada: `Generated ✓ authorized zip codes from X rows, Y valid codes`

---

## �📁 Archivos Listos para Subir

**Subir TODO el contenido de la carpeta `/out` a `public_html` en Hostinger:**

```
/out/
├── index.html                    ← Página principal
├── 404.html                     ← Página de error 404
├── partners/index.html          ← Página de partners
├── privacy-policy/index.html    ← Política de privacidad
├── quote/index.html             ← Página de cotización
├── terms/index.html             ← Términos y condiciones
├── _next/                       ← Assets de Next.js
├── bathroom-ambient.mp4         ← Videos de baños
├── bathroom-hero.mp4
├── bathroom1.mp4
├── bathroom2.mp4
├── bathroom3.mp4
├── bathroom4.mp4
├── bathroom5.mp4
├── bath-1.jpg                   ← Imágenes de baños
├── bath-2.jpg
├── bath-3.jpg
├── bath-4.jpg
├── bath-5.jpg
├── clients/                     ← Fotos de clientes
├── packages/                    ← Imágenes de paquetes
└── ... (todos los demás archivos)
```

## 🔧 Configuraciones Aplicadas

### ✅ **next.config.ts**
```typescript
const nextConfig = {
  output: 'export',             // genera /out estático
  images: { unoptimized: true}, // permite next/image sin servidor
  trailingSlash: true,          // evita 404 en hosting estático
  reactStrictMode: true,
};
```

### ✅ **package.json**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export",
    "build:static": "next build && next export",
    "start": "next start"
  }
}
```

### ✅ **API Routes Eliminadas**
- ❌ `src/app/api/contact/route.ts` → Eliminado
- ✅ Formulario configurado para usar servicio externo (Formspree)

### ✅ **Página 404 Personalizada**
- ✅ `src/app/not-found.tsx` → Creada

## 🌐 Configuración del Formulario

**IMPORTANTE:** Actualizar el endpoint del formulario en `src/lib/formConfig.ts`:

```typescript
export const FORM_CONFIG = {
  // Reemplazar con tu servicio real:
  endpoint: 'https://formspree.io/f/YOUR_FORM_ID',
  
  // O usar Netlify Forms:
  // endpoint: '/',
  // formName: 'contact',
  
  // O EmailJS:
  // serviceId: 'YOUR_SERVICE_ID',
  // templateId: 'YOUR_TEMPLATE_ID',
  // publicKey: 'YOUR_PUBLIC_KEY',
};
```

## 📋 Pasos para Desplegar

### 1. **Actualizar Formulario**
```bash
# Editar src/lib/formConfig.ts con tu endpoint real
# Luego ejecutar:
npm run build
```

### 2. **Subir a Hostinger**
1. Acceder al panel de Hostinger
2. Ir a **File Manager**
3. Navegar a `public_html`
4. **Eliminar todo el contenido actual** (si existe)
5. **Subir TODO el contenido de `/out`**

### 3. **Verificar SSL**
- Asegurar que SSL esté activado en Hostinger
- El sitio funcionará en `https://tudominio.com`

## 🎯 Características del Sitio Estático

### ✅ **Funcionalidades Mantenidas:**
- ✅ Videos de baños con autoplay
- ✅ Formulario de contacto (con servicio externo)
- ✅ TrustedForm para rastreo de leads
- ✅ Responsive design
- ✅ Animaciones con Framer Motion
- ✅ SEO optimizado
- ✅ PWA ready

### ✅ **Optimizaciones Aplicadas:**
- ✅ Rutas absolutas para todos los assets
- ✅ Imágenes optimizadas con `next/image`
- ✅ Videos con fallbacks
- ✅ Cache headers optimizados
- ✅ Compresión de assets

## 🔍 Verificación Post-Despliegue

### 1. **Probar Funcionalidades:**
- ✅ Página principal carga correctamente
- ✅ Videos se reproducen
- ✅ Formulario funciona (con endpoint configurado)
- ✅ Navegación entre páginas
- ✅ Responsive en móviles

### 2. **Verificar SEO:**
- ✅ Meta tags presentes
- ✅ Open Graph configurado
- ✅ Sitemap.xml incluido
- ✅ Robots.txt incluido

### 3. **Verificar Performance:**
- ✅ Página carga rápido
- ✅ Videos optimizados
- ✅ Imágenes comprimidas

## 🛠️ Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Build y export estático
npm run build:static

# Verificar build
ls -la out/
```

## 📞 Soporte

Si hay problemas después del despliegue:

1. **Verificar que todos los archivos estén en `public_html`**
2. **Comprobar que el endpoint del formulario sea correcto**
3. **Verificar que SSL esté activado**
4. **Revisar la consola del navegador para errores**

## 🎉 Resultado Final

- ✅ **Sitio 100% estático** listo para Hostinger
- ✅ **Sin dependencias de Node.js** en el servidor
- ✅ **Funciona con SSL** sin problemas
- ✅ **Optimizado para SEO** y performance
- ✅ **Responsive** en todos los dispositivos
- ✅ **Videos funcionando** correctamente

---

**Proyecto convertido exitosamente a sitio estático**  
**Fecha:** Diciembre 2024  
**Listo para subir a Hostinger** 🚀
