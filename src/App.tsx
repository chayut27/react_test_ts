import { useEffect, useRef, useState } from "react";
import PostInput from "./components/PostInput";
import Comments from "./components/Comments";

const initialComments = ["Comment A", "Comment B"];

function App() {
  const [comments, setComments] = useState<string[]>(initialComments);
  const postInputRef = useRef<HTMLInputElement>(null);
  async function addPost() {
    if (postInputRef?.current && postInputRef?.current?.value?.length > 0) {
      await setComments((preState) => [
        ...preState,
        postInputRef?.current?.value as string,
      ]);
      postInputRef.current.value = "";
    }
  }

  async function updateComment(index: number, value: string) {
    if (value.length > 0) {
      const newArray = [...comments];
      newArray[index] = value;
      setComments(newArray);
    }
  }

  return (
    <div className="App max-w-2xl mx-auto mt-5">
      <PostInput ref={postInputRef} addPost={addPost} />

      <div className="comment-list mt-5">
        {comments.map((comment, i) => {
          return (
            <Comments
              comment={comment}
              key={i}
              id={i}
              isMain={true}
              updateComments={updateComment}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
