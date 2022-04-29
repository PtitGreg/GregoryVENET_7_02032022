import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty, dateParser } from "../Utils";
import icon_comment from "../../styles/assets/icons/message1.svg";

const Card = ({ post }) => {
	console.log('post: ', post);
	const [isLoading, setIsLoading] = useState(true);
	const usersData = useSelector((state) => state.usersReducer);
	console.log('usersData: ', usersData);
	const userData = useSelector((state) => state.userReducer);
	console.log('userData: ', userData);
	const commentData = useSelector((state) => state.commentReducer);
	console.log('commentData: ', commentData);

	const test = ()=>commentData.find((element) => {
			if (element.id === post.id)
				return console.log("test",element);;
		})


	useEffect(() => {
		!isEmpty(usersData[0]) && setIsLoading(false);
	}, [usersData]);

	return (
		<li className="card-container" key={post.id}>
			{isLoading ? (
				<i className="fas fa-spinner fa-spin"></i>
			) : (
				<>
					<div className="card-left">
						<img
							src={
								!isEmpty(usersData[0]) &&
								usersData
									.map((user) => {
										if (user.id === post.UserId) return user.media;
									})
									.join("")
							}
							alt="Photo_profil_post"
						/>
					</div>
					<div className="card-right">
						<div className="card-header">
							<div className="lastName">
								<h3>
									{!isEmpty(usersData[0]) &&
										usersData.map((user) => {
											if (user.id === post.UserId) return user.lastName;
										})}
								</h3>
							</div>
							<span>{dateParser(post.createdAt)}</span>
						</div>
						<p>{post.content}</p>
						{post.media && (
							<img src={post.media} alt="image_post" className="card-pic" />
						)}
					</div>
					<div className="card-footer">
						<div className="comment-icon">
							<img src={icon_comment} alt="icon_comment" />
							<span>{test}</span>
						</div>
					</div>
				</>
			)}
		</li>
	);
};

export default Card;
