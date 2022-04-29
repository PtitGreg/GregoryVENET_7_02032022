// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";

export const getComments = () => {
	return async (dispatch) => {
		try {
			const res = await axios({
				method: "GET",
				url: `${process.env.REACT_APP_BACKEND_URL}comment/`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
			});
			dispatch({ type: GET_COMMENTS, payload: res.data });
		} catch (err) {
			console.log("err axios", err);
		}
	};
};
