// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments } from "../../actions/comment.actions";
import { dateParser, isEmpty } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";
import postReducer from "../../actions/post.actions";

const CardComment = ({ post }) => {
	const [content, setContent] = useState("");
	const userData = useSelector((state) => state.userReducer);
	const usersData = useSelector((state) => state.usersReducer);
	console.log('usersData: ', usersData);
	const postData = useSelector((state) => state.postReducer);
	const commentData = useSelector((state) => state.commentReducer);
	console.log('commentData: ', commentData);
	const dispatch = useDispatch();

	const handleComment = (e) => {
		e.preventDefault();
		if (content) {
			console.log('contentcardcomment: ', content);
			dispatch(addComment(post.id, userData.id, content))
				.then(() => setContent(""));
		} else {
			alert("Merci de saisir du texte !");
		}
	};
	return (
		<div className="comments-container">
			{!isEmpty(commentData[0]) &&
				postData.map((post) => {
					console.log('postcardcomment: ', post);
					return commentData.map((comment) => {
						if(post.id === comment.PostId){
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
														usersData.map((user) => {
															if (user.id === comment.UserId)
																return user.lastName;
															else return null;
														})}
												</h3>
											</div>
											<span>{dateParser(comment.createdAt)}</span>
											<p>{comment.content}</p>
											<EditDeleteComment comment={comment} postId={post.id} />
										</div>
									</div>
								</div>
							);
						} else {
							return null
						}
					});
				})}
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
