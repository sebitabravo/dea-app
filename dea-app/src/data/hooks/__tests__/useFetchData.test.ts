import { renderHook, act } from '@testing-library/react-native';
import { useFetchData } from '../useFetchData';

describe('useFetchData', () => {
  it('returns loading=true initially', () => {
    const fetchFn = jest.fn().mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useFetchData(fetchFn));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('returns data on successful fetch', async () => {
    const mockData = [{ id: 1, name: 'Item 1' }];
    const fetchFn = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetchData(fetchFn));

    expect(result.current.loading).toBe(true);

    await act(async () => {});
    // After the effect runs and fetch resolves
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('returns error on failed fetch', async () => {
    const fetchFn = jest.fn().mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useFetchData(fetchFn));

    await act(async () => {});
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Network error');
  });

  it('handles "Not Found" error by setting error state', async () => {
    const fetchFn = jest.fn().mockRejectedValue(new Error('Not Found'));

    const { result } = renderHook(() => useFetchData(fetchFn));

    await act(async () => {});
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Not Found');
  });

  it('refetch re-executes the fetch function', async () => {
    const mockData = [{ id: 1 }];
    const fetchFn = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetchData(fetchFn));

    await act(async () => {});
    expect(result.current.data).toEqual(mockData);

    const newData = [{ id: 2 }];
    fetchFn.mockResolvedValue(newData);

    act(() => {
      result.current.refetch();
    });

    await act(async () => {});
    expect(result.current.data).toEqual(newData);
  });
});
