// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, dateParser } from "../Utils";
import { updatePost } from "../../actions/post.actions";
import icon_comment from "../../styles/assets/icons/message1.svg";
import editImg from "../../styles/assets/icons/edit.svg";
import DeleteCard from "./DeleteCard";
import CardComment from "./CardComment";
import { uIdContext } from "../AppContext";

const Card = ({ post }) => {
	const usersData = useSelector((state) => state.usersReducer);
	const userData = useSelector((state) => state.userReducer);
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdated, setIsUpdated] = useState(false);
	const [textUpdate, setTextUpdate] = useState(null);
	const [showComment, setShowComment] = useState(false);
	const dispatch = useDispatch();
	const { isAdmin } = useContext(uIdContext);

	const updateItem = async () => {
		if (textUpdate) {
			dispatch(updatePost(post.id, textUpdate));
		}
		setIsUpdated(false);
	};
	useEffect(() => {
		!isEmpty(post) && setIsLoading(false);
	}, [post, usersData]);

	return (
		<li className="card-container" key={post.id}>
			{isLoading ? (
				<i className="fas fa-spinner fa-spin"></i>
			) : (
				<>
					<div className="card-left">
						{!isEmpty(usersData[0]) &&
							usersData.map((user) =>
								user.id === post.UserId ? (
									<img
										key={user.id}
										className=""
										src={user.media}
										alt="Photo_profil_post"
									/>
								) : null,
							)}
					</div>
					<div className="card-right">
						<div className="card-header">
							<div className="lastName">
								<h3>
									{!isEmpty(usersData[0]) &&
										usersData.map((user) =>
											user.id === post.UserId ? user.lastName : null,
										)}
								</h3>
							</div>
							<span>{dateParser(post.createdAt)}</span>
						</div>
						{isUpdated === false && <p>{post.content}</p>}
						{isUpdated && (
							<div className="update-post">
								<textarea
									defaultValue={post.content}
									onChange={(e) => setTextUpdate(e.target.value)}
								/>
								<div className="button-container">
									<button className="btn" onClick={updateItem}>
										Valider la modification
									</button>
								</div>
							</div>
						)}
						{post.media && (
							<img src={post.media} alt="image_post" className="card-pic" />
						)}
						{(isAdmin || userData.id === post.UserId) && (
							<div className="button-container">
								{userData.id === post.UserId && (
									<div onClick={() => setIsUpdated(!isUpdated)}>
										<img src={editImg} alt="icon_edit" />
									</div>
								)}

								<DeleteCard id={post.id} isAdmin={isAdmin} />
							</div>
						)}
						<div className="card-footer">
							<div className="comment-icon">
								<img
									onClick={() => setShowComment(!showComment)}
									src={icon_comment}
									alt="comment"
								/>
								<span>{}</span>
							</div>
						</div>
						{showComment && <CardComment post={post} />}
					</div>
				</>
			)}
		</li>
	);
};
export default Card;
