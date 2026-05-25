const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL;
const fallbackApiUrl = 'http://localhost:3000/api/v1';

if (process.env.NODE_ENV === 'production') {
	if (!configuredApiUrl) {
		throw new Error('EXPO_PUBLIC_API_URL is required in production');
	}

	if (configuredApiUrl.startsWith('http://')) {
		throw new Error('EXPO_PUBLIC_API_URL must use HTTPS in production');
	}
}

export const API_URL: string = configuredApiUrl || fallbackApiUrl;