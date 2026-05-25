import * as React from 'react';

type FetchParam = string | number | boolean | null | undefined;
type FetchFunction<T> = (...params: FetchParam[]) => Promise<T>;

interface UseFetchDataReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useFetchData = <T,>(
    fetchFunction: FetchFunction<T>,
    ...params: FetchParam[]
): UseFetchDataReturn<T> => {
    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const serializedParams = React.useMemo(() => JSON.stringify(params), [params]);

    const fetchData = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction(...params);
            setData(result);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- params spread no es verificable estáticamente
    }, [fetchFunction, serializedParams]);

    React.useEffect(() => {
        setData(null);
        void fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
