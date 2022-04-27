// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React from "react";
import { useState } from "react";
import SignUpForm from "./SignUpLog";
import LoginForm from "./LoginLog";

const Log = () => {
	const [signUpModal, setSignUpModal] = useState(true);
	const [loginModal, setLoginModal] = useState(false);

	const handleModals = (e) => {
		if (e.target.id === "register") {
			setLoginModal(false);
			setSignUpModal(true);
		} else if (e.target.id === "login") {
			setLoginModal(true);
			setSignUpModal(false);
		}
	};

	return (
		<div className="connection-form">
			<div className="form-container">
				<ul>
					<li
						onClick={handleModals}
						id="register"
						className={signUpModal ? "active-btn" : null}>
						S'inscrire
					</li>
					<li
						onClick={handleModals}
						id="login"
						className={loginModal ? "active-btn" : null}>
						Se connecter
					</li>
				</ul>
				{signUpModal && <SignUpForm />}
				{loginModal && <LoginForm />}
			</div>
		</div>
	);
};

export default Log;
