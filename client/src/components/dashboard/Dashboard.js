import React, { Component } from "react";
import { View } from "react-native-web";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import './style.css';
import Radium, {StyleRoot} from "radium";
import { Box, alpha} from "@mui/material";
import background from "../layout/background.jpg";
import { fadeIn } from "react-animations"; 
import U_form from "../file-m/uploadform";

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
		borderRadius: '10px',
		color: 'primary.main',
		fontWeight: 'medium',
		alignItems: 'center',
		backgroundColor: alpha('#2e0b1b', 0.7),
		width: '40%',
		p: 3
	},

	baseText: {
		fontFamily: "Roboto",
		fontSize: 20,
		color: 'white',
	  },
	  titleText: {
		fontSize: 50,
		fontWeight: "bold",
		color: 'cyan'
	  }
}


class Dashboard extends Component {
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};
	render() {
		const { user } = this.props.auth;
		return (
	<div style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', minheight: '100%',
	height: '100vh',
	position: 'relative'}}>
		<StyleRoot>
			<div style={stails.fadeIn}>
				<View style={stails.big}>
					<Box sx={stails.box}>
						<div className="container">
							<div className="row">
								<div className="col-sm-12 text-center dashboardText">
									<h3>Hola! {user.name.split(" ")[0]}</h3>
									<button onClick={this.onLogoutClick} className="btn logoutbtn">Logout</button>
								</div>
							</div>
							<br />
							<U_form id = {user.id} rest = {user.rest}/>
						</div>
					</Box>
				</View>
			</div>
		</StyleRoot>
	</div>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
