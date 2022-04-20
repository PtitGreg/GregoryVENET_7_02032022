// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React from "react";
// import HeaderLog from "../components/header/HeaderLogComp";
import Log from "../components/log";
import LogImg from "../styles/assets/log.svg";

const profilPage = () => {
	return (
		<div className="profil-page">
			<div className="log-container">
				<Log />
				<div className="img-container">
					<img src={LogImg} alt="img-log" />
				</div>
			</div>
		</div>
	);
};

export default profilPage;
