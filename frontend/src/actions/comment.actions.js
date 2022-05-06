// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getComments = (post) => {
	console.log('getcommentscommentaction: ', post);
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
			if (err.response) {
				alert("Erreur lors de l'affichage des commentaires", err.response.data);
			}
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
					PostId:postId,
					content,
				},
			});
			dispatch({ type: ADD_COMMENT, payload: { postId } });
		} catch (err) {
			if (err.response) {
				alert("Erreur lors de l'ajout d'un commentaire", err.response.data);
			}
		}
	};
};

export const updateComment = (id, content) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "PUT",
				url: `${process.env.REACT_APP_BACKEND_URL}comment/${id}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
				data: { content, id },
			});
			dispatch({ type: UPDATE_COMMENT, payload: { content, id } });
			console.log('content: ', content);
		} catch (err) {
			if (err.response) {
				alert("Erreur lors de la mise à jour", err.response.data);
			}
		}
	};
};

export const deleteComment = (commentId) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "DELETE",
				url: `${process.env.REACT_APP_BACKEND_URL}comment/${commentId}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
				data: { commentId },
			});
			dispatch({ type: DELETE_COMMENT, payload: { commentId } });
		} catch (err) {
			if (err.response) {
				alert("Erreur lors de la suppression", err.response.data);
			}
		}
	};
};
