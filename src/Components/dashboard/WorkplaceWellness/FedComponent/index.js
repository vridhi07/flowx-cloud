import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Header from "./header";
import Single from "./Single";
import TrendView from "./Trend";


const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "#FFF",
		width: "100%",
	},
	header_main: {
		minHeight: '75vh'
	},
	
	sidebar_mobile: {

	},
}));

function FedComponent({fedlist,selectedFed, matches, handleSelectPage }) {
	const [selectTab, setSelectTab] = useState("Single");
	const classes = useStyles();
	
	return (
		<>
			{/* {!matches ?
				<div className={classes.root}>
					<div className={classes.header_main}>
						<div className="d-flex">
							{selectTab === "Single" ? (
								<Single selectedFed={selectedFed} fedlist={fedlist} matches={matches} handleSelectPage={handleSelectPage} />
							) : (
								<TrendView matches={matches} handleSelectPage={handleSelectPage} />
							)}
						</div>
					</div>
				</div>
				: <>
					
					<div >
						<div className={`${classes.chart_mobile} d-flex mx-1 mt-3`}>
							{selectTab === "Single" ? (
								<Single matches={matches} handleSelectPage={handleSelectPage} />
							) : (
								<TrendView matches={matches} handleSelectPage={handleSelectPage} />
							)}

						</div>
					</div>

				</>} */}
		</>
	);
}
export default FedComponent;
