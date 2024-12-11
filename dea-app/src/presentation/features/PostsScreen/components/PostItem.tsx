import { PostListDto } from '@/domain/models/post/PostListDto';
import { timeElapsedAbv } from '@/presentation/utils/formatDate';
import { Image } from 'expo-image';
import * as React from 'react';
import { Text, View } from 'react-native';

interface PostItemProps {
    posts: PostListDto[];
    loading: boolean;
}

const PostItemComponent: React.FC<PostItemProps> = ({ posts, loading }) => {
    return (
        <>
            {posts?.map((post) => (
                <View key={post.post_id}
                    className="flex justify-center p-4 border-b border-gray-200 space-y-2">
                    {/* Header */}
                    <View
                        className='flex flex-row items-center justify-between'
                    >
                        <Text className="text-lg font-semibold">{post.title}</Text>

                        <Text className="text-gray-500">{timeElapsedAbv(post.created_at)}</Text>
                    </View>

                    {/* Body */}
                    <View className='flex w-full px-4 py-6 bg-background-light2 justify-center items-center rounded-3xl'>

                        {
                            post.image ? (
                                <Image
                                    source={{
                                        uri: post.image
                                    }}
                                    className='w-full h-60 rounded-3xl mb-4'
                                />
                            ) : null
                    }

                        
                        <Text className="text-[16px]">{post.content}</Text>
                    </View>

                    {/* Footer */}
                    <View className=''>
                        <Text className="text-[12px]">{post.username}</Text>
                    </View>
                </View>
            ))}
        </>
    );
};

export const PostItem = React.memo(PostItemComponent);
