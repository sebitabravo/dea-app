import { BASE_URL } from '@/data/constants/api_url';
import { CreatePostDto } from '@/domain/models/post/CreateProductDto';

const route = 'posts';

export const apiGetPosts = async () => {
    try {
        const res = await fetch(`${BASE_URL}/${route}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export const apiCreatePost = async (data: CreatePostDto) => {
    try {
        const res = await fetch(`${BASE_URL}/${route}`, {
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