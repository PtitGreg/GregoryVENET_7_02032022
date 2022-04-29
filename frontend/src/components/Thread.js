import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { getComments } from "../actions/comment.actions";
import { isEmpty } from "./Utils";
import Card from "./post/Card"


const Thread = () => {
	const [ loadPost, setLoadPost ] = useState(true);
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.postReducer);

	useEffect(() => {
		if (loadPost) {
			dispatch(getPosts());
			setLoadPost(false);
			dispatch(getComments())
		}
	}, [dispatch, loadPost]);

	return <div className="thread-container">
		<ul>
			{!isEmpty(posts[ 0 ]) &&
				posts.map((post) => {
				return <Card post={post} key={post.id} />;
			})}
		</ul>
	</div>
};

export default Thread;
