import { API_URL } from '@/data/constants/api_url';
import { CreatePostDto } from '@/domain/models/post/CreateProductDto';
import { PostListDto } from '@/domain/models/post/PostListDto';
import { getAuthToken } from './secureTokenStorage';

const route = 'posts';

interface ApiEnvelope<T> {
    data: T | null;
    error: { message: string; status: number } | null;
    meta: unknown;
}

export const apiGetPosts = async (): Promise<PostListDto[]> => {
    try {
        const res = await fetch(`${API_URL}/${route}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const json: ApiEnvelope<PostListDto[]> = await res.json();
        return json.data ?? [];
    } catch (error) {
        console.error('Error fetching data: ', error);
        return [];
    }
}

export const apiCreatePost = async (data: CreatePostDto) => {
    try {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/${route}`, {
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
        throw new Error(error instanceof Error ? error.message : 'Unknown error creating post');
    }
}