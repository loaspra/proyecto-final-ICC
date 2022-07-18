import React from "react";
import { Link } from "react-router-dom";
import { View, Text} from "react-native-web";
import { fadeIn } from "react-animations";
import Radium, {StyleRoot} from "radium";
import { Box, alpha} from "@mui/material";

import background from "./background.jpg";
import "./style.css";


const stails ={
	fadeIn: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn')
	},
	big: {
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 0, 
		justifyContent: 'center', 
		alignItems: 'center'
	},

	box: {
		borderRadius: '5px',
		color: 'primary.main',
		fontWeight: 'medium',
		alignItems: 'center',
		backgroundColor: alpha('#2e0b1b', 0.9),
		p: 5
	},

	baseText: {
		fontSize: 20,
		color: 'white',
	  },
	  
	  titleText: {
		fontSize: 50,
		fontWeight: "bold",
		color: 'cyan'
	  }
}


class Landing extends React.Component {
 
	render() {
		return (
			<div style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', minheight: '100%',
			height: '100vh',
			position: 'relative'}}>
				<StyleRoot>
					<div style={stails.fadeIn}>
						<View style={stails.big}>
							<Box sx={stails.box}>
								<Text style={stails.titleText}>Hello!, Log In or Sign up</Text>
								<br />
								<Text style={stails.baseText}>Extract Text from your Images and convert it to Sound!</Text>
							{/* Links to Register & Login */}
								<div>
									{/* Register */}
									<Link to="/register" className="btn registerButton">Sign Up</Link>

									{/* Login */}
									<Link to="/login" className="btn loginButton">Log In</Link>
								</div>
							</Box>
						</View>
					</div>
				</StyleRoot>
			</div>
		);
	}
}
export default Landing;
