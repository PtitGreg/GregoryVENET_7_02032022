// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import { UPDATE_COMMENT, GET_COMMENTS, DELETE_COMMENT } from "../actions/comment.actions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COMMENTS:
			return action.payload;
		case UPDATE_COMMENT:
			return state.map((post, comment) => {
				console.log('post.id: ', post.id);
				console.log('action.payload.postId: ', action.payload.postId);
				console.log('action.payload.commentId: ', action.payload.commentId);
				console.log('action.payload.content: ', action.payload.content);
				if (post.id === action.payload.postId) {
					console.log("teeeeeeeeeeeest");
					return {
						...post,
						content: (comment === action.payload.commentId) ? {
							...comment,
							content: action.payload.content,
						}: comment
					};
				} else {
					console.log("eeeeeeeeeerreeeeeeeur",post)
					return post
				};
			})
		case DELETE_COMMENT:
			return state.map((post, comment) => {
				if (post.id === action.payload.postId) {
					return {
						...post,
						comment: comment.filter(
							(comment) => comment.id===action.payload.commentId
						)
					}
				}else return post;
			})
		default:
			return state;
	}
}
