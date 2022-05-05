// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import fileIcon from "../../styles/assets/icons/picture.svg";
import { timestampParser } from "../Utils";
import { addPost, getPosts } from "../../actions/post.actions";

const NewPostForm = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [postMedia, setPostMedia] = useState(null);
	const [file, setFile] = useState();
	const userData = useSelector((state) => state.userReducer);
	console.log('userData: ', userData);
	const dispatch = useDispatch();

	const handlePost = () => {
		if (message || postMedia) {
			const data = new FormData();
			data.append("UserId", userData.id);
			data.append("content", message);
			if (file) {
				data.append("media", file)
			};
			dispatch(addPost(data));
			dispatch(getPosts());
			cancelPost();
		} else {
			alert("Veuillez entrer un message");
		}
	};

	const handleMedia = (e) => {
		setPostMedia(URL.createObjectURL(e.target.files[0]));
		setFile(e.target.files[0]);
	};

	const cancelPost = () => {
		setMessage("");
		setPostMedia("");
		setFile("");
	};

	useEffect(() => {
		if (userData !== null) setIsLoading(false);
	}, [userData]);

	return (
		<div className="post-container">
			{isLoading ? (
				<i className="fas fa-spinner fa-pulse"></i>
			) : (
				<>
					<NavLink to="/profil">
						<div className="user-info">
							<img src={userData.media} alt="user-img" />
						</div>
					</NavLink>
					<div className="post-form">
						<textarea
							name="message"
							id="message"
							placeholder={"Quoi de neuf " + userData.lastName + " ?"}
							onChange={(e) => setMessage(e.target.value)}
							value={message}
						/>
						{message || postMedia ? (
							<li className="card-container">
								<div className="card-left">
									<img src={userData.media} alt="user-pic" />
								</div>
								<div className="card-right">
									<div className="card-header">
										<div className="lastName">
											<h3>{userData.lastName}</h3>
										</div>
										<span>{timestampParser(Date.now())}</span>
									</div>
									<div className="content">
										<p>{message}</p>
										<img src={postMedia} alt="" />
									</div>
								</div>
							</li>
						) : null}
						<div className="footer-form">
							<div className="icon">
								<img src={fileIcon} alt="img" />
								<input
									type="file"
									id="file-upload"
									name="media"
									accept=".jpg, .jpeg, .png, .webp, .gif"
									onChange={(e) => handleMedia(e)}
								/>
							</div>
							<div className="btn-send">
								{message || postMedia ? (
									<button className="cancel" onClick={cancelPost}>
										Annuler message
									</button>
								) : null}
								<button className="send" onClick={handlePost}>
									Envoyer
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default NewPostForm;
