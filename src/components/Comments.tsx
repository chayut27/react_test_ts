import React, { useRef, useState } from "react";
import PostInput from "./PostInput";

type Props = {
  comment: string;
  isMain?: boolean;
  isReply?: boolean;
  id?: number;
  setIsReply?: (params: boolean) => any;
  updateComments?: (params: any) => any;
  addPost?: () => any;
};

const Comments = (props: Props) => {
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const replyInput = useState<HTMLInputElement>(null);

  const [replys, setReplys] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState<string>("");

  async function add() {
    if (replyInput.current && replyInput?.current?.value.length > 0) {
      await setReplys((preState) => [
        ...preState,
        replyInput?.current?.value as string,
      ]);
      setIsReply(false);
      replyInput.current.value = "";
    }
  }

  async function update(index: number, value: string) {
    if (value.length > 0) {
      const newArray = [...replys];
      newArray[index] = value;
      setReplys(newArray);
      setInputValue("");
    }
  }

  return (
    <>
      <div>
        <div
          className={`  comments p-3 ${
            props.isMain ? "border-b" : "border-t pl-10"
          }`}
        >
          {isEdit ? (
            <PostInput
              ref={replyInput}
              value={inputValue}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              update={props.updateComments}
              id={props.id}
            />
          ) : (
            <>
              <div>{props.comment}</div>
              <div>
                {!isReply ? (
                  <div className="flex gap-2">
                    <button
                      className=" text-blue-300 border-blue-300 hover:bg-blue-400 hover:text-white border p-1 text-sm"
                      onClick={() => {
                        setIsEdit(true);
                        setInputValue(props.comment);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className=" text-orange-300 border-orange-300 hover:bg-orange-400 hover:text-white border p-1 text-sm"
                      onClick={() => {
                        setIsReply(true);
                        setInputValue("");
                      }}
                    >
                      Reply
                    </button>
                  </div>
                ) : (
                  <PostInput
                    ref={replyInput}
                    isReply={isReply}
                    isEdit={isEdit}
                    value={inputValue}
                    setIsReply={setIsReply}
                    setIsEdit={setIsEdit}
                    add={add}
                    update={props.updateComments}
                    id={props.id}
                  />
                )}
              </div>
            </>
          )}

          {replys.map((reply, i) => {
            return (
              <Comments
                comment={reply}
                key={i}
                id={i}
                updateComments={update}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

Comments.defaultProps = {
  isMain: false,
};
export default Comments;
