// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useContext } from "react";
import { uIdContext } from "../components/AppContext";
import Log from "../components/log";
import NewPostForm from "../components/post/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {
	const uId = useContext(uIdContext);
	return (
		<div className="home">
			{uId ? (
				<div className="main">
					<div className="home-header">
						<NewPostForm />
					</div>
					<Thread />
				</div>) : (null)}
		</div>
	);
};

export default Home;
