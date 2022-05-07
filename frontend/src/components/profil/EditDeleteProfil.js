// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { deleteUser } from "../../actions/user.actions";
import { dateParser } from "../Utils";
import {useNavigate} from "react-router-dom"

const UpdateProfil = () => {
	const [bio, setBio] = useState("");
	const [updateForm, setUpdateForm] = useState(false);
	const userData = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	let navigate= useNavigate()

	const handleUpdate = () => {
		dispatch(updateBio(userData.id, bio));
		setUpdateForm(false);
	};

	const handleDelete = (isAdmin) => {
		dispatch(deleteUser(userData.id, isAdmin))
		localStorage.clear();
		// navigate("/", {replace: true})
		window.location.assign("/profil")

	}


	return (
		<div className="profil-container">
			<h1>Profil de {userData.lastName}</h1>
			<div className="update-container">
				<div className="left-part">
					<h3>Photo de profil</h3>
					<img src={userData.media} alt="image_utilisateur" />
					<UploadImg />
					<br />
					<button
						onClick={() => {
							if (window.confirm("Voulez-vous vraiment supprimer ce compte ?")) {
								handleDelete();
							}
						}}>Supprimer votre compte
					</button>
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
					<br />
					<h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
				</div>
			</div>
		</div>
	);
};

export default UpdateProfil;
