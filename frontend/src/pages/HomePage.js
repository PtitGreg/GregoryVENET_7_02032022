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
			<div className="main">
				<div className="home-header">
					{uId ? <NewPostForm /> : <Log />}
				</div>
				<Thread />
			</div>
		</div>
	);
};

export default Home;
