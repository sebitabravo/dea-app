import * as React from 'react';

type FetchFunction<T> = (...params: any[]) => Promise<T>;

interface UseFetchDataReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useFetchData = <T,>(
    fetchFunction: FetchFunction<T>,
    ...params: any[]
): UseFetchDataReturn<T> => {
    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const fetchData = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction(...params);
            setData(result);
        } catch (error: any) {
            if (error.message === 'Not Found') {
                setData([] as unknown as T); // Manejar el caso específico de tipo T
            } else {
                setError(error.message || 'An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    }, [fetchFunction, ...params]);

    React.useEffect(() => {
        setData(null);
        fetchData();
    }, [fetchData, ...params]);

    return { data, loading, error, refetch: fetchData };
};
