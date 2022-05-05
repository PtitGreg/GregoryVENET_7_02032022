// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
	return async (dispatch) => {
		try {
			const res = await axios({
				method: "GET",
				url: `${process.env.REACT_APP_BACKEND_URL}user/`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
			});
			dispatch({ type: GET_USERS, payload: res.data });
		} catch (err) {
			if (err.response) {
				alert("Erreur lors de la récupération des utilisateurs", err.response.data);
			}
		}
	};
};
