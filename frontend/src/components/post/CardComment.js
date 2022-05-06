// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments } from "../../actions/comment.actions";
import { dateParser, isEmpty } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";
import { uIdContext } from "../AppContext";

const CardComment = ({ post }) => {
	const [content, setContent] = useState("");
	const userData = useSelector((state) => state.userReducer);
	const usersData = useSelector((state) => state.usersReducer);
	const postData = useSelector((state) => state.postReducer);
	const commentData = useSelector((state) => state.commentReducer);
	const arrayCommPost = commentData.concat(postData);
	const dispatch = useDispatch();
	const { isAdmin } = useContext(uIdContext);


	const handleComment = (e) => {
		e.preventDefault();
		if (content) {
			dispatch(addComment(post.id, userData.id, content)).then(() => {
				setContent("")
				dispatch(getComments())
			});
		} else {
			alert("Merci de saisir du texte !");
		}
	};
	return (
		<div className="comments-container">
			{!isEmpty(commentData[0]) &&
				arrayCommPost.map((comment) =>
					comment.PostId === post.id ? (
						<div
							className={
								comment.UserId === userData.id
									? "comment-container client"
									: "comment-container"
							}
							key={comment.id}>
							<div className="left-part">
								<img
									src={
										!isEmpty(usersData[0]) &&
										usersData
											.map((user) =>
												user.id === comment.UserId ? user.media : null,
											)
											.join("")
									}
									alt="commenter-pic"
								/>
							</div>
							<div className="right-part">
								<div className="comment-header">
									<div className="lastName">
										<h3>
											{!isEmpty(usersData[0]) &&
												usersData.map((user) =>
													user.id === comment.UserId ? user.lastName : null,
												)}
										</h3>
									</div>
									<span>{dateParser(comment.createdAt)}</span>
									<p>{comment.content}</p>
									<EditDeleteComment
										comment={comment}
										postId={post.id}
										isAdmin={isAdmin}
									/>
								</div>
							</div>
						</div>
					) : null,
				)}
			{userData.id && (
				<form action="" onSubmit={handleComment} className="comment-form">
					<input
						type="text"
						name="text"
						onChange={(e) => setContent(e.target.value)}
						value={content}
						placeholder="Laisser un commentaire"
					/>
					<br />
					<input type="submit" value="Envoyer" />
				</form>
			)}
		</div>
	);
};

export default CardComment;
