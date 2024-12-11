import { useFetchData } from '@/data/hooks/useFetchData';
import { apiGetPosts } from '@/data/services/postsServices';
import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { PostItem } from './PostItem';

export function PostListContainer() {
    const { data: posts, loading, refetch } = useFetchData(apiGetPosts);
    const [refreshing, setRefreshing] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            refetch();
            return () => {};
        }, [refetch])
    );

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await refetch();  // Refresca los datos
        setRefreshing(false);
    }, [refetch]);

    console.log('posts', posts);

    if (loading) {
        return <Text>Loading...</Text>;
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
                    title='Loading...'
                />
            }
        >
            <PostItem posts={posts} loading={loading} />
        </ScrollView>
    );
}
