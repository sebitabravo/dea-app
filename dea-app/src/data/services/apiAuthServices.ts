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
        console.log(data)
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}