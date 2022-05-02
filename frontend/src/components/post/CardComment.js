// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import { getComments, addComment } from "../../actions/comment.actions";
import { dateParser, isEmpty } from "../Utils";

const CardComment = ({ post }) => {
	const [text, setText] = useState("");
	const userData = useSelector((state) => state.userReducer);
	const usersData = useSelector((state) => state.usersReducer);
	const commentData = useSelector((state) => state.commentReducer);
	const dispatch = useDispatch();

	const handleComments = (e) => {
		e.preventDefault();
		if (text) {
			dispatch(addComment(post.id, userData.id, text))
				.then(() => dispatch(getPosts))
				.then(() => setText(""));
		} else {
			alert("Merci de saisir du texte !");
		}
	};
	return (
		<div className="comments-container">
			{!isEmpty(commentData[0]) &&
				commentData.map((comment) => {
					return (
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
											.map((user) => {
												if (user.id === comment.UserId) return user.media;
												else return null;
											})
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
												usersData
													.map((user) => {
														if (user.id === comment.UserId)
															return user.lastName;
														else return null;
													})}
										</h3>
									</div>
									<span>{dateParser(comment.createdAt)}</span>
									<p>{comment.content}</p>
								</div>
							</div>
						</div>
					);
				})}
			{userData.id && (
				<form action="" onSubmit={handleComments} className="comment-form">
					<input
						type="text"
						name="text"
						onChange={(e) => setText(e.target.value)}
						value={text}
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
