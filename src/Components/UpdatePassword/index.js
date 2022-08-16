import React from 'react';
import { makeStyles } from '@mui/styles';
import CircularIndeterminate from "../Loader/index";
import { useRouter } from "next/router";

const useStyles = makeStyles((themes) => ({
    updatePassBg: {
        backgroundImage: `url("/background-login-page.png")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
    },
    login_box: {
        width: '530px',
    },
    login_inputbox: {
        margin: "10px 0",
        padding: "20px 30px",
        outline: "none",
        boxSizing: "border-box",
        height: "45px",
        width: "300px",
        borderRadius: "5px",
        marginTop: '20px',
        margin: 'auto',
        border: "1px solid #B6C2CF",
    },
    signInBtn: {
        height: "45px",
        width : '230px',
        // padding: '10px 40px',
        borderRadius: "22px",
        backgroundColor: "#0687D9",
        border: "hidden",
        fontWeight: "500",
        marginTop: "40px",
        margin: 'auto'
    },
    sgnBtnTxt: {
        height: "22px",
        width: "68.1px",
        color: "#FFF",
        // fontFamily: "Century Gothic",
        fontSize: "18px",
        lineHeight: "22px",
        border: "none",
    },
    updateText: {
        fontSize: "18px",
        lineHeight: "22px",
        textAlign: 'center',
        padding: '10px 0px'
    }
}));

function UpdatePasswordPage({ handleChange, handleUpdatePassword,loader,message }) {
    const classes = useStyles();
    const router = useRouter();
    const handleHome = () =>{
        router.push('/login')
    }
    return (
        <div className={`${classes.updatePassBg} `}>
            <div className='d-flex  justify-content-center'>
                <div className={`${classes.login_box} `}>
                    <div className="d-flex justify-content-center">
                        <img src="/logo-Flowx.png" onClick={handleHome} />
                    </div>
                    <div className={classes.updateText}>update password</div>
                    <form className='d-flex flex-column' onSubmit={(event) =>handleUpdatePassword(event)} >
                        <input
                            name="email"
                            type="email"
                            className={classes.login_inputbox}
                            placeholder="Enter email"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <button
                            className={classes.signInBtn}>
                            <span className={classes.sgnBtnTxt}>{loader ?  <CircularIndeterminate /> : "Update Password" }</span>
                        </button>
                    </form>
                    <div className='text-danger text-center mt-3'>{message}</div>
                </div>
            </div>
        </div >
    )
}
export default UpdatePasswordPage;
