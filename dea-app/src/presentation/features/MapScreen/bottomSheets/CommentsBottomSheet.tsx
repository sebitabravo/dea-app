import { useFetchData } from '@/data/hooks/useFetchData'
import { apiGetCommentsWithLikes, apiGetRepliesWithComment } from '@/data/services/commentPostServices'
import LottieView from 'lottie-react-native'
import * as React from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { useCommentsActions } from '../actions/commentsActions'
import { AddCommentBar } from '../components/AddCommenBar'
import { CommentCard } from '../components/CommentCard'
import { commentsReducer } from '../reducers/commentsReducer'

interface Comment {
  id: string
  content: string
  likes: number
  user: {
    id: string
    name: string
    profilePicture: string
  }
}


// Componente memoizado para renderizar un comentario
const RenderComment = React.memo(({
  comment,
  setCommentText,
  textInputRef
}: {
  comment: Comment,
  setCommentText: (text: string) => void,
  textInputRef: React.RefObject<TextInput>,
}) => {

  const [selectedCommentID, setSelectedCommentID] = React.useState(null);

  const { data: replies, loading } = useFetchData(apiGetRepliesWithComment, 33, selectedCommentID);


  const handleReplies = (commentID: any) => {
    setSelectedCommentID(commentID);
    setIsOpenReplies(true);
  };

  React.useEffect(() => {
    if (selectedCommentID) {
    }
  }, [replies, selectedCommentID]);

  const [isOpenReplies, setIsOpenReplies] = React.useState(false);


  return (
    <>
      <CommentCard
        comment={comment}
        loading={loading}
        selectedCommentID={selectedCommentID}
        handleReplies={handleReplies}
        replies={replies}
        isOpenReplies={isOpenReplies}
        setCommentText={setCommentText}
        textInputRef={textInputRef}
      />

    </>
  )
})

// Componente principal para los comentarios
export function CommentsBottomSheet({ postID }: any) {
  const { data: postComments, loading } = useFetchData(apiGetCommentsWithLikes, postID)

  const [commentText, setCommentText] = React.useState('')
  const textInputRef = React.useRef(null);

  // Usar un array como estado inicial para comentarios
  const [comments, dispatch] = React.useReducer(commentsReducer, [])
  const { setCommentsAction, addCommentAction } = useCommentsActions(dispatch)

  React.useEffect(() => {
    if (!loading && postComments) {
      setCommentsAction(postComments)
    }
  }, [postComments, loading])

  return (
    <View className='h-screen dark:bg-myGray6 relative '>
      <Text style={s.title} className='dark:text-white'>Comentarios</Text>

      <FlatList
        data={comments}
        renderItem={({ item, index }) => <RenderComment comment={item} setCommentText={setCommentText} textInputRef={textInputRef} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          loading ? (
            <View></View>
          ) : (
            <View>
              <Text className="text-center font-bold text-lg dark:text-white">Aun no hay comentarios</Text>
              <Text className="text-center mt-4 dark:text-white">¡Inicia el chisme! 🐍</Text>
              <LottieView
                autoPlay
                style={{ width: 220, height: 220, alignSelf: 'center' }}
                source={require('@/app/assets/lottie/robot.json')}
              />
            </View>
          )
        }
        contentContainerStyle={s.content}
      />

      {/* //Input */}
      <AddCommentBar
        postID={postID}
        addCommentAction={addCommentAction}
        commentText={commentText}
        setCommentText={setCommentText}
        textInputRef={textInputRef}
      />

    </View>
  )
}

const s = StyleSheet.create({
  textInput: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "grey",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 6,
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  content: {
    marginTop: 20,
    gap: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: '100%',
  },
});
