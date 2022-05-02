// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import axios from "axios";

export const GET_COMMENTS = "GET_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";

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

export const addComment = (UserId, PostId, content) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "POST",
				url: `${process.env.REACT_APP_BACKEND_URL}comment/`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
				data: {
					UserId,
					PostId,
					content,
				},
			});
			dispatch({ type: ADD_COMMENT, payload: { PostId } });
		} catch (err) {
			console.log("err post comment", err);
		}
	};
};
