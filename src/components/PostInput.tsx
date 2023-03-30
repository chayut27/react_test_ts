import React, { forwardRef } from "react";

type Props = {
  isReply?: boolean;
  isEdit?: boolean;
  id?: any;
  value?: string;
  ref?: React.RefObject<HTMLTextAreaElement>;
  addPost?: () => any;
  add?: () => any;
  setIsReply?: (params: boolean) => any;
  setIsEdit?: (params: boolean) => any;
  update?: (params: any) => any;
};

const PostInput = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      isReply = false,
      isEdit = false,
      id,
      addPost,
      add,
      setIsReply,
      setIsEdit,
      update,
      value = ''
    },
    ref
  ) => {
    function resetReply() {
      setIsReply(false);
    }
    function resetEdit() {
      setIsEdit(false);
    }

    return (
      <div className=" bg-gray-50 rounded shadow border">
        <div>
          <textarea
            ref={ref}
            rows={5}
            cols={50}
            defaultValue={value}
            className="w-full border-0 resize-none rounded-none px-4 py-2"
            placeholder="Add your comment..."
          >
          </textarea>
        </div>
        <div className="flex gap-4 justify-end px-2 pt-1 pb-2">
          {!isReply && !isEdit ? (
            <button
              onClick={() => addPost()}
              className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
            >
              Add
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  if (isReply) {
                    resetReply();
                  }
                  if (isEdit) {
                    setIsEdit();
                  }
                }}
                className="bg-gray-300 px-4 py-2 rounded text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isReply) {
                    add();
                  }
                  if (isEdit) {
                    if (ref?.current && ref?.current?.value.length > 0) {
                      update(id,ref?.current?.value);
                      resetEdit();
                    }
                  }
                }}
                className="bg-orange-500 px-4 py-2 rounded text-white hover:bg-orange-600"
              >
                Update
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default PostInput;
