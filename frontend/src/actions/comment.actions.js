// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"

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

export const addComment = (postId, userId, content) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "POST",
				url: `${process.env.REACT_APP_BACKEND_URL}comment/`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
				data: {
					userId,
					postId,
					content,
				},
			});
			dispatch({ type: ADD_COMMENT, payload: { postId } });
		} catch (err) {
			console.log("err post comment", err);
		}
	};
};

export const updateComment = (postId, commentId, content) => {
	console.log('postId: ', postId);
	console.log('commentId: ', commentId);
	console.log('content: ', content);
	return async (dispatch) => {
		try {
			await axios({
				method: "PUT",
				url: `${process.env.REACT_APP_BACKEND_URL}comment/${commentId}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
				data: {
					commentId, content
				},
			});
			dispatch({ type: UPDATE_COMMENT, payload: { postId, commentId, content } });
		} catch (err) {
			console.log("err update comment", err);
		}
	};
};

export const deleteComment = (postId, commentId) => dispatch => {
	return async (dispatch) => {
		try {
			await axios({
				method: "DELETE",
				url: `${process.env.REACT_APP_BACKEND_URL}comment/${commentId}`,
				data:{commentId}
			})
			dispatch({ type:DELETE_COMMENT, payload: { postId, commentId } });
		} catch (err) {
			console.log(err);
		}
	}
}
