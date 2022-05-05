// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

export const getUser = (userId) => {
	return async (dispatch) => {
		try {
			const res = await axios({
				method: "GET",
				url: `${process.env.REACT_APP_BACKEND_URL}user/${userId}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
			});
			dispatch({ type: GET_USER, payload: res.data });
		} catch (err) {
			if (err.response) {
				alert("Erreur lors de la récupération de l'utilisateur", err.response.data);
			}
		}
	};
};

export const uploadPicture = (data, userId) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "PUT",
				url: `${process.env.REACT_APP_BACKEND_URL}user/${userId}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
				data,
			});
			const res = await axios({
				method: "GET",
				url: `${process.env.REACT_APP_BACKEND_URL}user/${userId}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
			});
			dispatch({ type: UPLOAD_PICTURE, payload: res.data.media });
		} catch (err) {
			if (err.response) {
				alert("Fichier supérieur à 1Mb ou format incompatible !");
			}
			if (err.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};

export const updateBio = (userId, bio) => {
	console.log("userId: ", userId);
	return async (dispatch) => {
		try {
			await axios({
				method: "PUT",
				url: `${process.env.REACT_APP_BACKEND_URL}user/${userId}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
				data: { bio },
			});
			dispatch({ type: UPDATE_BIO, payload: bio });
		} catch (err) {
			if (err.response) {
				alert("Erreur lors de la mise à jour de la bio", err.response.data);
			}
		}
	};
};
