import { useFetchData } from '@/data/hooks/useFetchData';
import { apiGetPosts } from '@/data/services/postsServices';
import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { PostItem } from './PostItem';

export function PostListContainer() {
    const { data: posts, loading, error, refetch } = useFetchData(apiGetPosts);
    const [refreshing, setRefreshing] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            refetch();
            return () => {};
        }, [refetch])
    );

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return (
            <Text className="text-red-500 text-center mt-4" accessibilityRole="alert">
                Error: {error}
            </Text>
        );
    }

    if (!posts || posts.length === 0) {
        return <Text>No posts available</Text>;
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#ff6347']}
                    title="Loading..."
                />
            }
        >
            <PostItem posts={posts} loading={loading} />
        </ScrollView>
    );
}
