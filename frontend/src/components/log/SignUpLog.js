// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginLog";

const SingUpForm = () => {
	const [formSubmit, setFormSubmit] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [controlPassword, setControlPassword] = useState("");

	const handleSignup = (e) => {
		e.preventDefault();
		const terms = document.getElementById("terms");

		const firstNameError = document.querySelector(".firstName.error");
		const lastNameError = document.querySelector(".lastName.error");
		const emailError = document.querySelector(".email.error");
		const passwordError = document.querySelector(".password.error");
		const passwordConfirmError = document.querySelector(
			".password-confirm.error",
		);
		const termsError = document.querySelector(".terms.error");

		firstNameError.innerHTML= ""
		lastNameError.innerHTML = ""
		emailError.innerHTML = ""
		passwordConfirmError.innerHTML = "";
		termsError.innerHTML = "";

		if (password !== controlPassword || !terms.checked) {
			if (password !== controlPassword) {
				passwordConfirmError.innerHTML =
					"Les mots de passe ne correspondent pas";
			}
			if (!terms.checked) {
				termsError.innerHTML = "Veuillez valider les conditions générales";
			}
		} else {
			axios({
				method: "post",
				url: `${process.env.REACT_APP_BACKEND_URL}user/signup`,
				data: {
					firstName,
					lastName,
					email,
					password,
				},
			})
				.then((res) => {
					setFormSubmit(true);
				})
				.catch((err) => {
					const errData = err.response.data;
					if (errData.errorPassword) {
						passwordError.innerHTML = errData.errorPassword;
					}
					if (errData.error.errors[0].path === "email") {
						emailError.innerHTML = "Email déjà existant";
					}
					if (errData.error.errors[0].path === "firstName") {
						console.log("test");
						firstNameError.innerHTML =
							"Le Nom doit contenir uniquement etre 2 et 20 lettres";
					}
					if (errData.error.errors[0].path === "lastName") {
						console.log("test");
						lastNameError.innerHTML =
							"Le Prénom doit contenir uniquement etre 2 et 20 lettres";
					}
				});
		}
	};
	return (
		<>
			{formSubmit ? (
				<>
					<LoginForm />
					<span></span>
					<h4 className="success">
						Enregistrement réussi, Veuillez vous connecter
					</h4>
				</>
			) : (
				<form action="" onSubmit={handleSignup} id="sign-up-form">
					<label htmlFor="firstName">Nom</label>
					<br />
					<input
						type="text"
						required
						id="firstName"
						name="firstName"
						placeholder="Nom..."
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
					/>
					<div className="firstName error"></div>
					<br />
					<label htmlFor="lastName">Prénom</label>
					<br />
					<input
						type="text"
						required
						id="lastName"
						name="lastName"
						placeholder="Prénom..."
						onChange={(e) => setLastName(e.target.value)}
						value={lastName}
					/>
					<div className="lastName error"></div>
					<br />
					<label htmlFor="email">Email</label>
					<br />
					<input
						type="email"
						required
						id="email"
						name="email"
						placeholder="Email..."
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<div className="email error"></div>
					<br />
					<label htmlFor="password">Mot de passe</label>
					<br />
					<input
						type="password"
						required
						id="password"
						name="password"
						placeholder="Mot de passe..."
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<div className="password error"></div>
					<br />
					<label htmlFor="password-conf">Confirmer le mot de passe</label>
					<br />
					<input
						type="password"
						required
						id="password-conf"
						name="password"
						placeholder="Mot de passe..."
						onChange={(e) => setControlPassword(e.target.value)}
						value={controlPassword}
					/>
					<div className="password-confirm error"></div>
					<br />
					<input type="checkbox" id="terms" />
					<label htmlFor="terms">
						J'accepte les{" "}
						<a href="/" target="_blank" rel="noopener noreferrer">
							conditions générales
						</a>
					</label>
					<div className="terms error"></div>
					<br />
					<input type="submit" value="Valider l'inscription" />
				</form>
			)}
		</>
	);
};

export default SingUpForm;
