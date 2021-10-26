import { useContext, useState } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import userContext from "../../context/user";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(userContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([...comments, { displayName, comment }]);
    setComment("");

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setComment(value);
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        action=""
        method="POST"
        className="flex justify-between pl-0 pr-5"
        onSubmit={(event) => {
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault();
        }}
      >
        <input
          type="text"
          aria-label="Add a comment"
          autoComplete="off"
          placeholder="Add a comment..."
          name="add-comment"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          value={comment}
          onChange={(event) => {
            handleChange(event);
          }}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};
