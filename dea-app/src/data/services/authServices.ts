import { BASE_URL } from "../constants/api_url";

const route = 'auth'

export const apiLogin = async (data: Object) => {
    try {
        const res = await fetch(`${BASE_URL}/${route}/login`, {
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

export const apiRegister = async (data: Object) => {
    try {
        const res = await fetch(`${BASE_URL}/${route}/register`, {
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