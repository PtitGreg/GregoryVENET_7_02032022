// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";
import deleteImg from "../../styles/assets/icons/trash.svg";

const DeleteCard = (props) => {
	const dispatch = useDispatch();

	const deleteQuote = () => dispatch(deletePost(props.id, props.isAdmin));

	return (
		<div
			onClick={() => {
				if (window.confirm("Voulez-vous vraiment supprimer ce post ?")) {
					deleteQuote();
				}
			}}>
			<img src={deleteImg} alt="icon_delete" />
		</div>
	);
};

export default DeleteCard;
