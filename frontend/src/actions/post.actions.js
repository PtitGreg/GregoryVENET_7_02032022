// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = (num) => {
	return async (dispatch) => {
		try {
			const res = await axios({
				method: "GET",
				url: `${process.env.REACT_APP_BACKEND_URL}post/`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
			});
			const array = res.data.slice(0, num);
			dispatch({ type: GET_POSTS, payload: array });
		} catch (err) {
			console.log("err get axios", err.response.data);
		}
	};
};

export const addPost = (data) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "POST",
				url: `${process.env.REACT_APP_BACKEND_URL}post/`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
				data
			});
		} catch (err) {
			console.log("err get axios", err.response.data);
		}
	};
};

export const updatePost = (id, content) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "PUT",
				url: `${process.env.REACT_APP_BACKEND_URL}post/${id}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
				data: {content, id}
			})
			dispatch({ type: UPDATE_POST, payload:{content, id}})
		} catch (err) {
			console.log("err put axios", err.response.data);
		}
	}
}

export const deletePost = (id) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "DELETE",
				url: `${process.env.REACT_APP_BACKEND_URL}post/${id}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
			})
			dispatch({type: DELETE_POST, payload: {id}})
		} catch (err) {
			console.log("err delete axios", err.response.data);
		}
	}
}


