
import 'dotenv/config';
export default {
  "expo": {
    "userInterfaceStyle": "automatic",
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
      "GOOGLE_MAPS_API_KEY": process.env.GOOGLE_MAPS_API_KEY
    }
  }
}
