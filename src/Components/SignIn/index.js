import React, { useEffect, useState } from "react";
import InputBox from "../InputBox";
// import Button from '../Button';
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles';
import { display } from '@mui/system';
import { auth, db } from "../../firebaseConfig";
import firebase from "firebase/app";
import "firebase/auth";
import CircularIndeterminate from "../Loader/index"
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((themes) => ({
	login_page: {
		backgroundImage: `url("/background-login-page.png")`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		width: "100%",
		height: "100vh",
	},
	login_feilds: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
	},
	login_inputbox: {
		margin: "10px 0",
		padding: "20px 30px",
		outline: "none",
		boxSizing: "border-box",
		height: "45px",
		minWidth: "26%",
		borderRadius: "3px",
		border: "1px solid #B6C2CF",
	},
	login_button: {
		padding: "20px 30px",
		backgroundColor: "aquamarine",
		borderRadius: "8px",
		border: "none",
		fontSize: "20px",
		fontWeight: "700",
		color: "#fff",
		width: "30%",
		cursor: "pointer",
	},
	login_here: {
		marginTop: "20px",
		textAlign: "right",
		color: "#0687D9",
		cursor: 'pointer',
	},
	signInBtn: {
		height: "45px",
		width: "159px",
		borderRadius: "22px",
		backgroundColor: "#0687D9",
		border: "hidden",
		fontWeight: "500",
		marginTop: "16px",
	},
	sgnBtnTxt: {
		height: "22px",
		width: "68.1px",
		color: "#FFF",
		fontFamily: "Century Gothic",
		fontSize: "18px",
		lineHeight: "22px",
		border: "none",
	},
	iconContainer: {
		width: "255px",
		display: "flex",
		justifyContent: "space-evenly",
		marginTop: "30px",
	},
	tabTexts: {
		width: "50%",
		margin: "auto",
		display: "flex",
		justifyContent: "space-evenly"
	},
	tabTexts_mobile: {
		width: "97%",
		margin: "auto",
		display: "flex",
		justifyContent: "space-evenly"
	},
	logintop: {
		margin: "auto",
		width: "50%",
	},
	signIn: {
		cursor: "pointer",
		fontFamily: "Century Gothic",
		fontWeight: "700",
		lineHeight: "21px",
		color: "#0687D9",
	},
	sgnRegText: {
		color: "#000000",
	},
	connect: {
		color: "#6D7F8E",
	},
	socialIcon: {
		cursor: "pointer",
	}
}));

function SignInPage({ handleChange, handleClick, errorStatus, handleSignUp, errorMessage, loader }) {
	const router = useRouter()
	const matches = useMediaQuery('(max-width:600px)');
	const classes = useStyles();
	const [tabNumber, setTabNumber] = useState(0);
	const [userDetail, setUserDetail] = useState({
		Email: "",
		Name: "",
	})
	const handleAccout = () => {
		router.push('/updatePassword')
	}

	useEffect(() => {
		if (userDetail.Email && userDetail.Name && userDetail.uid) {
			db.collection('Users').doc(`${userDetail.uid}`).set({ userInfo: userDetail });
			router.push('/')
		}
	}, [userDetail.uid])

	const handleSignUpwithSocial = (e, type) => {
		if (type === "google") {
			let provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then((result) => {
				if (result) {
					localStorage.setItem('currentUser', JSON.stringify(result.user.uid));
					const data = {
						Email: result?.additionalUserInfo?.profile?.email,
						Name: `${result?.additionalUserInfo?.profile?.given_name} ${result?.additionalUserInfo?.profile?.family_name}`,
					}
					setUserDetail({
						...userDetail,
						Email: result?.additionalUserInfo?.profile?.email,
						Name: `${result?.additionalUserInfo?.profile?.given_name} ${result?.additionalUserInfo?.profile?.family_name}`,
						uid: result?.user?.uid
					})
				}
			})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					// The email of the user's account used.
					const email = error.email;
					// The AuthCredential type that was used.
					// const credential = provider.credentialFromError(error);
				});
		}
		if (type === "facebook") {
			let provider = new firebase.auth.FacebookAuthProvider();
			firebase.auth().signInWithPopup(provider).then((result) => {
				if (result) {
					router.push('/')
				}
			})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					// The email of the user's account used.
					const email = error.email;
					// The AuthCredential type that was used.
					// const credential = provider.credentialFromError(error);
				});
		}
		if (type === "apple") {
			let provider = new firebase.auth.OAuthProvider('apple.com');
			firebase.auth().signInWithPopup(provider).then((result) => {
				if (result) {
					router.push('/')
				}
			})
				.catch((error) => {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					// The email of the user's account used.
					var email = error.email;
					// The firebase.auth.AuthCredential type that was used.
					var credential = error.credential;

					// ...
				});

		}
	}
	const headerTabStyle = (isMobile) => {
		return isMobile ? classes.tabTexts_mobile : classes.tabTexts
	}


	return (
		<div className={`${classes.login_page} `}>
			<div>
				<div className="d-flex justify-content-center">
					<img src="/logo-Flowx.png" />
				</div>
				<div className={headerTabStyle(matches)}>
					<div className={tabNumber ? `${classes.signIn} ${classes.sgnRegText}` : classes.signIn}
						onClick={() => setTabNumber(0)}>
						SIGN IN
					</div>
					<div className={!tabNumber ? `${classes.signIn} ${classes.sgnRegText}` : classes.signIn}
						onClick={() => setTabNumber(1)}>
						REGISTRATION
					</div>
				</div>
				{!tabNumber ? (
					<div className={`${classes.logintop} d-flex justify-content-evenly`}>
						{" "}
						<img src={"/path2.png"} />
					</div>
				) : (
					<div className={`${classes.logintop} d-flex justify-content-evenly`}>
						{" "}
						<img src={"/path.png"} />
					</div>
				)}
				<div className={`${classes.login_feilds} py-2 my-4`}>
					{tabNumber === 1 ? <>
						<input
							name="firstName"
							type="text"
							className={classes.login_inputbox}
							placeholder="First Name"
							onChange={(e) => handleChange(e)}
						/>
						<input
							name="lastName"
							type="text"
							className={classes.login_inputbox}
							placeholder="Last Name"
							onChange={(e) => handleChange(e)}
						/>
					</> : null}
					<input
						name="emailId"
						type="email"
						className={classes.login_inputbox}
						placeholder="E-mail"
						onChange={(e) => handleChange(e)}
					/>

					<input
						name="passWord"
						type="password"
						className={classes.login_inputbox}
						placeholder="Password"
						onChange={(e) => handleChange(e)}
					/>
					{tabNumber === 1 ?
						<input
							name="confirmPassword"
							type="password"
							className={classes.login_inputbox}
							placeholder="Confirm Password"
							onChange={(e) => handleChange(e)}
						/> : null}
					{tabNumber === 0 ?
						<button onClick={handleClick} className={classes.signInBtn}>
							<span className={classes.sgnBtnTxt}>{!errorStatus && loader ? <CircularIndeterminate /> : 'Sign In'}</span>
						</button> :
						<button onClick={handleSignUp} className={classes.signInBtn}>
							<span className={classes.sgnBtnTxt}>{!errorStatus && loader ? <CircularIndeterminate /> : 'Sign Up'}</span>
						</button>}
					{errorStatus ? <div>{errorMessage}</div> : null}
					{tabNumber === 0 ?
						<>
							<div className={classes.login_here} onClick={handleAccout}>
								Forgot Password?{" "}
							</div>
							<div className={`${classes.connect} mt-2`} >
								or connect with
							</div>
						</> : null}

					{tabNumber === 0 ?
						<div className={classes.iconContainer}>
							{/* <img src="./apple-ico.png" width="60px" height="60px" onClick={(e) => handleSignUpwithSocial(e, "apple")} className={classes.socialIcon} /> */}
							<img src="/facebook-ico.png" width="60px" height="60px" onClick={(e) => handleSignUpwithSocial(e, "facebook")} className={classes.socialIcon} />
							<img src="/google-ico.png" width="60px" height="60px" onClick={(e) => handleSignUpwithSocial(e, "google")} className={classes.socialIcon} />
						</div> : null}
				</div>
			</div>
		</div>
	);
}

export default SignInPage;
