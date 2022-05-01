import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const CardComment = (post) => {
	const [text, setText] = useState("");
	const userData = useSelector((state) => state.userReducer);
	const usersData = useSelector((state) => state.usersReducer);
	const commentData = useSelector((state)=>state.commentReducer);
	const dispatch = useDispatch();

	const handleComments = () => {};
return (
	<div className="comments-container">
		{commentData.map((comment) => {
			console.log("comment: ", comment.lastName);
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
												if (user.id === comment.UserId) return user.lastName;
												else return null;
											})
											.join("")}
								</h3>
							</div>
						</div>
					</div>
				</div>
			);
		})}
	</div>
);
};

export default CardComment;
