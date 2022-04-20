// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React from "react";
import { NavLink } from "react-router-dom";

const headerHome = () => {
	return (
		<div>
			<nav>
				<ul>
					<NavLink to="/">
						<li>
							<img
								src={"../../styles/assets/icons/icon-left-font.svg"}
								alt="logo"
							/>
						</li>
					</NavLink>
					<NavLink to="/users">
						<img src={"../../styles/assets/icons/users.svg"} alt="img-users" />
					</NavLink>
					<NavLink to="/notify">
						<img src="../../styles/assets/icons/message1.svg" alt="img-msg" />
					</NavLink>
					<NavLink to="/profile">backend</NavLink>
					<NavLink to="/login">
						<img src="../../styles/assets/icons/logout.svg" alt="logout" />
					</NavLink>
				</ul>
			</nav>
		</div>
	);
};

export default headerHome;
