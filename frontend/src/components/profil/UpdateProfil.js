// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";

const UpdateProfil = () => {
	const [bio, setBio] = useState("");
	const [updateForm, setUpdateForm] = useState(false);
	const userData = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();

	const handleUpdate = () => {
		dispatch(updateBio(userData.id, bio));
		setUpdateForm(false);
	};

	return (
		<div className="profil-container">
			<h1>Profil de {userData.lastName}</h1>
			<div className="update-container">
				<div className="left-part">
					<h3>Photo de profil</h3>
					<img src={userData.media} alt="image_utilisateur" />
					<UploadImg />
				</div>
				<div className="right-part">
					<div className="bio-update">
						<h3>Bio</h3>
						{updateForm === false && (
							<>
								<p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
								<button onClick={() => setUpdateForm(!updateForm)}>
									Modifier bio
								</button>
							</>
						)}
						{updateForm && (
							<>
								<textarea
									type="text"
									defaultValue={userData.bio}
									onChange={(e) => setBio(e.target.value)}></textarea>
								<button onClick={handleUpdate}>Valider modifications</button>
							</>
						)}
					</div>
					<h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
				</div>
			</div>
		</div>
	);
};

export default UpdateProfil;
