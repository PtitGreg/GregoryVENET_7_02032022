import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		const emailError = document.querySelector(".email.error");
		const passwordError = document.querySelector(".password.error");

		axios({
			method: "post",
			url: `${process.env.REACT_APP_BACKEND_URL}user/login`,
			withCredentials: false,
			data: {
				email,
				password,
			},
		})
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("id", res.data.id);
				window.location = "/"; //a modifier
			})
			.catch((err) => {
				console.log(err.response);
				const errData = err.response.data;
				if (errData.errorMail) {
					emailError.innerHTML = err.response.data.errorMail;
				} else {
					emailError.innerHTML = ""
				}
				if (errData.errorPassword) {
					passwordError.innerHTML = err.response.data.errorPassword;
				} else {
					passwordError.innerHTML = ""
					console.log(err);
				}
			});
	};

	return (
		<form action="" onSubmit={handleLogin} id="sign-up-form">
			<label htmlFor="email">Email</label>
			<br />
			<input
				type="text"
				name="email"
				id="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				placeholder="Email..."
			/>
			<div className="email error"></div>
			<br />
			<label htmlFor="password">Mot de passe</label>
			<br />
			<input
				type="password"
				name="password"
				id="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				placeholder="Mot de passe..."
			/>
			<div className="password error"></div>
			<br />
			<input type="submit" value="Se connecter" />
		</form>
	);
};

export default LoginForm;
