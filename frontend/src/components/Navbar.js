// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./AppContext";
import logo from "../styles/assets/icons/icon-left-font-monochrome-black.svg";
import Users from "../styles/assets/icons/users.svg";
import Notify from "../styles/assets/icons/notification-bell.svg";
import User from "../styles/assets/icons/user.svg";
import Logout from "../styles/assets/icons/logout.svg";

const headerHome = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const uid = useContext(LoginContext);
	return (
		<nav>
			<div className="nav-container">
				<div className="logo">
					<NavLink to="/">
						<img src={logo} alt="logo Groupomania" />
					</NavLink>
					{uid ? (
						<ul>
							<li className="welcome">
								<NavLink to="/Profil">
									<h5>Bienvenue "valeur a intégrer"</h5>
								</NavLink>
							</li>
							<NavLink to="/users">
								<img src={Users} alt="Icône des utilisateurs" />
							</NavLink>
							<NavLink to="/notify">
								<img src={Notify} alt="Icône de notification" />
							</NavLink>
							<NavLink to="/user">
								<img src={User} alt="Icône utilisateur" />
							</NavLink>
							<NavLink to="/login">
								<img src={Logout} alt="Icône déconnexion" />
							</NavLink>
						</ul>
					) : (
							<ul>
								<li></li>
								<li>
									<NavLink to="/profil">
									</NavLink>
								</li>
						</ul>
					)}
				</div>
			</div>
		</nav>
	);
};

export default headerHome;
