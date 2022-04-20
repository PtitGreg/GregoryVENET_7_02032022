// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React from "react";
import { NavLink } from "react-router-dom";

const headerLog = () => {
	return (
		<div>
			<nav>
				<ul>
					<NavLink>
						<img
							src={require("../../styles/assets/icons/icon-left-font.svg")}
							alt={"logo-img"}
						/>
					</NavLink>
				</ul>
			</nav>
		</div>
	);
};

export default headerLog;
