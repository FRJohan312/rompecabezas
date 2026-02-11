# Rompecabezas Interactivo - Instrucciones

## 📋 Descripción
Este es un juego de rompecabezas interactivo de 30 piezas (6x5) que utiliza la imagen `pista.jpeg`.

## ✨ Características
- **30 piezas** organizadas en una cuadrícula de 6 columnas x 5 filas
- Sistema de **drag & drop** (arrastra y suelta) para colocar las piezas
- Validación automática: solo puedes colocar cada pieza en su posición correcta
- Barra de progreso en tiempo real
- Al completar el rompecabezas:
  - ✉️ Envía automáticamente un correo a `archivodeltiempo2112@gmail.com`
  - 🔗 Redirige automáticamente a `https://frjohan312.github.io/a-oymes/`

## 📁 Archivos
- `index.html` - Estructura del juego
- `style.css` - Estilos visuales con gradientes y animaciones
- `script.js` - Lógica del rompecabezas
- `pista.jpeg` - Imagen que se convertirá en rompecabezas (**debes proporcionarla**)

## 🚀 Cómo usar

### 1. Añade tu imagen
Coloca tu imagen con el nombre **exacto** `pista.jpeg` en esta carpeta (`juego/`).

### 2. Abre el juego
Abre `index.html` en cualquier navegador web moderno.

### 3. Juega
- Arrastra las piezas desde la parte inferior
- Suéltalas en la cuadrícula superior
- Solo se colocarán si están en la posición correcta
- Completa todas las 30 piezas para ganar

## ⚙️ Configuración del correo

El juego usa **EmailJS** (igual que el resto del proyecto) para enviar el correo automáticamente.

### Configuración actual:
Las credenciales de EmailJS ya están configuradas en el archivo `script.js`:
- **Public Key**: `rQsNPFPIBLjw5H_O1`
- **Service ID**: `service_n03t122`
- **Template ID**: `template_aeax64f`

### Al completar el rompecabezas:
1. Se muestra modal: "Enviando correo..."
2. Se envía el correo mediante EmailJS
3. Modal cambia a: "✅ ¡Correo Enviado!"
4. Espera 2 segundos
5. Modal cambia a: "🔗 Redirigiendo..."
6. Redirige a la URL especificada

### Mensaje del correo:
> "deberías jugar para relajarte un rato, mientras recuerdas dulces momentos..."

## 🎨 Personalización

Si deseas cambiar algo, edita estas configuraciones en `script.js`:

```javascript
// URL de redirección
const REDIRECT_URL = 'https://frjohan312.github.io/a-oymes/';

// Parámetros del correo
const EMAIL_PARAMS = {
    to_email: 'archivodeltiempo2112@gmail.com',
    subject: 'Rompecabezas Completado',
    message: 'deberías jugar para relajarte un rato, mientras recuerdas dulces momentos...',
    from_name: 'Sistema de Rompecabezas'
};
```

## 📱 Compatibilidad
- ✅ Chrome, Firefox, Safari, Edge (versiones modernas)
- ✅ Dispositivos móviles (táctil)
- ✅ Tablets
- ✅ Escritorio

## 🔧 Solución de problemas

**La imagen no aparece:**
- Verifica que el archivo se llame exactamente `pista.jpg` (no `.jpeg` ni con mayúsculas)
- Asegúrate de que esté en la misma carpeta que `index.html`

**El correo no se envía:**
- Verifica que EmailJS esté configurado correctamente
- Revisa la consola del navegador (F12) para ver errores
- Asegúrate de tener conexión a internet

**Las piezas no se arrastran:**
- Usa un navegador moderno actualizado
- Verifica que JavaScript esté habilitado
