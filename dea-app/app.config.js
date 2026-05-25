
import 'dotenv/config';
export default {
  "expo": {
    "name": "dea-app",
    "slug": "dea-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      // GOOGLE_MAPS_API_KEY se resuelve desde el environment (/.env o variable de entorno).
      // RIESGO: en Expo Go / React Native, las extra properties se incluyen en el bundle.
      // La key debe estar restringida en Google Cloud Console por:
      //   - iOS: bundle ID (com.seudominio.app)
      //   - Android: SHA-1 fingerprint + package name
      // Sin estas restricciones, cualquiera puede extraer la key del binario y usarla.
      "GOOGLE_MAPS_API_KEY": process.env.GOOGLE_MAPS_API_KEY
    }
  }
}
