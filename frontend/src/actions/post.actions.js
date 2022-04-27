import axios from "axios"

export const GET_POSTS = "GET_POSTS"

export const getPosts = () => {
	return async (dispatch) => {
		try {
			const res = await axios({
				method: "GET",
				url: `${process.env.REACT_APP_BACKEND_URL}post/`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("Token")}`,
				},
			});
			dispatch({ type: GET_POSTS, payload: res.data });
		} catch (err) {
			console.log("err axios", err);
		}
	};
};
