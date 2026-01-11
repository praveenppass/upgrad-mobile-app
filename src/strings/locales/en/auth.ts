// Authentication related strings

const auth = {
	login: "Login",
	logout: "Logout",
	forgotPassword: "Forgot Password",
	errors: {
		invalidCredentials: "Invalid credentials",
		sessionExpired: "Session expired",
		tooManyAttempts: (minutes: number) =>
			`Too many attempts. Try again in ${minutes} minutes`,
	},
} as const;

export default auth;
