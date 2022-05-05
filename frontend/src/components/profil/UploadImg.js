// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
	const [media, setMedia] = useState();
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.userReducer);

	const handlePicture = (e) => {
		e.preventDefault();
		const data = new FormData();
		console.log("data: ", data);
		data.append("name", userData.lastName);
		data.append("userId", userData.id);
		data.append("media", media);

		dispatch(uploadPicture(data, userData.id));
	};

	return (
		<form action="" onSubmit={handlePicture} className="upload-pic">
			<label htmlFor="file">Changer d'image</label>
			<input
				type="file"
				id="file"
				name="media"
				accept=".jpg, .jpeg, .png, .gif, .webp"
				onChange={(e) => setMedia(e.target.files[0])}
			/>
			<br />
			<input type="submit" value="Envoyer" />
		</form>
	);
};

export default UploadImg;
