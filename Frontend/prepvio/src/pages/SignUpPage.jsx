import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authstore";


const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	
	const { signup, error, isLoading, user } = useAuthStore();

	// Use a useEffect hook to watch for changes in the user state.
	// This is the most reliable way to handle redirects after async actions.
	useEffect(() => {
		// Only run this effect if a user object exists.
		if (user) {
			// If the user is verified, redirect to the dashboard.
			if (user.isVerified) {
				navigate("/dashboard");
			} else {
				// If the user is not verified, redirect to the verification page.
				navigate("/verify-email");
			}
		}
	}, [user, navigate]); // The effect depends on the user object and navigate function.

	const handleSignUp = async (e) => {
		e.preventDefault();
		// The signup function itself should handle its own loading and errors.
		// It will update the store, which the useEffect hook will react to.
		signup(email, password, name);
	};

	return (
		<div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 to-yellow-50">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full bg-gray-100 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
			>
				<div className='p-10'>
					<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text'>
						Create Account
					</h2>

					<form onSubmit={handleSignUp}>
						<Input
							icon={User}
							type='text'
							placeholder='Full Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							icon={Lock}
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
						<PasswordStrengthMeter password={password} />

						<motion.button
							className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
							font-bold rounded-lg shadow-lg hover:from-blue-600
							hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
							focus:ring-offset-gray-100 transition duration-200'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign Up"}
						</motion.button>
					</form>
				</div>
				<div className='px-8 py-4 bg-gray-300 bg-opacity-50 flex justify-center'>
					<p className='text-sm text-gray-800'>
						Already have an account?{" "}
						<Link to={"/login"} className='text-blue-400 hover:underline'>
							Login
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default SignUpPage;
