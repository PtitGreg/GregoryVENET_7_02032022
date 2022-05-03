import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uIdContext } from "../AppContext";
import { updateComment, deleteComment } from "../../actions/comment.actions";
import editCommImg from "../../styles/assets/icons/edit.svg";
import deleteImg from "../../styles/assets/icons/trash.svg"

const EditDeleteComment = ({ comment, postId }) => {
	console.log('comment: ', comment);
	const [isAuthor, setIsAuthor] = useState(false);
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState("");
	const uid = useContext(uIdContext);
	const dispatch = useDispatch();

	const handleUpdate = (e) => {
		e.preventDefault();

		if (text) {
			dispatch(updateComment(postId, comment.id, comment.content));
			console.log('comment.content: ', comment.content);
			setText("");
			setEdit(false);
		}
	};

	const handleDelete = () => dispatch(deleteComment(postId, comment.id));

	useEffect(() => {
		const checkAuthor = () => {
			if (uid === comment.UserId) {
				setIsAuthor(true);
			}
		};
		checkAuthor();
	}, [uid, comment.UserId]);

	return (
		<div className="edit-comment">
			{isAuthor && edit === false && (
				<span onClick={() => setEdit(!edit)}>
					<img src={editCommImg} alt="edit-comment" />
				</span>
			)}
			{isAuthor && edit && (
				<form action="" onSubmit={handleUpdate} className="edit-comment-form">
					<label htmlFor="text" onClick={() => setEdit(!edit)}>
						Editer
					</label>
					<br />
					<input
						type="text"
						name="text"
						onChange={(e) => setText(e.target.value)}
						defaultValue={comment.content}
					/>
					<br />
					<div className="btn">
						<span onClick={() => {
							if (window.confirm("Voulez-vous supprimer ce commentaire ?")
							) {
								handleDelete()
							}
						}}>
							<img src={deleteImg} alt="icon_delete" />
						</span>
						<input type="submit" value="Valider modification" />
					</div>
				</form>
			)}
		</div>
	);
};

export default EditDeleteComment;
