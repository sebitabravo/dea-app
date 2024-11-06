import { BASE_URL } from '@/data/constants/api_url';

export const getGetDeaPoints = async () => {
    try {
        const res = await fetch(`${BASE_URL}/dea-points`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export const apiCreateDeaPoint = async (data: Object) => {
    try {
        const res = await fetch(`${BASE_URL}/dea-points`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}