// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uIdContext } from "../AppContext";
import { updateComment, deleteComment } from "../../actions/comment.actions";
import editCommImg from "../../styles/assets/icons/edit.svg";
import deleteImg from "../../styles/assets/icons/trash.svg";

const EditDeleteComment = ({ comment, postId }) => {
	const [isAuthor, setIsAuthor] = useState(false);
	const [edit, setEdit] = useState(false);
	console.log('edit: ', edit);
	const [content, setContent] = useState("");
	const { userId } = useContext(uIdContext);
	const dispatch = useDispatch();
	const { isAdmin } = useContext(uIdContext);

	const handleUpdate = (e) => {
		e.preventDefault();
		if (content) {
			dispatch(updateComment(comment.id, content));
			setContent("");
			setEdit(false);
		}
	};

	const handleDelete = (props) => {
		console.log("props: ", props);
		dispatch(deleteComment(comment.id, props.isAdmin));
	};

	useEffect(() => {
		const checkAuthor = () => {
			if (userId === comment.UserId) {
				setIsAuthor(true);
			}
		};
		checkAuthor();
	}, [userId, comment.UserId]);

	return (
		<div className="edit-comment">
			{isAuthor && edit === false && (
				<span onClick={() => setEdit(!edit)}>
					<img src={editCommImg} alt="edit-comment" />
				</span>
			)}
			{((isAdmin && edit) || (isAuthor && edit)) && (
				<form action="" onSubmit={handleUpdate} className="edit-comment-form">
					{isAuthor && edit && (
						<label htmlFor="text" onClick={() => setEdit(!edit)}>
							Editer
						</label>
					)}
					<br />
					<input
						type="text"
						name="text"
						onChange={(e) => setContent(e.target.value)}
						defaultValue={comment.content}
					/>
					<br />
					<div className="btn">
						<span
							onClick={() => {
								if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
									handleDelete(isAdmin);
								}
							}}>
							<img src={deleteImg} alt="icone_delete" />
						</span>
						<input type="submit" value="Valider modification" />
					</div>
				</form>
			)}
		</div>
	);
};

export default EditDeleteComment;
