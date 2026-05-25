import { API_URL } from '@/data/constants/api_url';
import type { DeaPoints } from '@/domain/models/DeaPoints';
import { getAuthToken } from './secureTokenStorage';

interface CreateDeaPointDto {
    user_id: number;
    title: string;
    description?: string;
    latitude: number;
    longitude: number;
}

interface ApiEnvelope<T> {
    data: T | null;
    error: { message: string; status: number } | null;
    meta: unknown;
}

export const getGetDeaPoints = async (): Promise<DeaPoints[]> => {
    try {
        const res = await fetch(`${API_URL}/dea-points`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const json: ApiEnvelope<DeaPoints[]> = await res.json();
        return json.data ?? [];
    } catch (error) {
        console.error('Error fetching data: ', error);
        return [];
    }
}

export const apiCreateDeaPoint = async (data: CreateDeaPointDto) => {
    try {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/dea-points`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const json: ApiEnvelope<unknown> = await res.json();
        return json.data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error creating dea point');
    }
}