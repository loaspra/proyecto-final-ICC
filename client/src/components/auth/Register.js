import React, { Component } from "react";
import { View } from "react-native-web";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { fadeIn } from "react-animations";
import Radium, {StyleRoot} from "radium";
import { Box, alpha} from "@mui/material";
import background from "../layout/background.jpg";
import './Register.css';


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
		width: '50%',
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

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {}
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerUser(newUser, this.props.history);

	};

	render() {
		const { errors } = this.state;
		return (
			<div style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', minheight: '100%',
			height: '100vh',
			position: 'relative'}}>
			<StyleRoot>
			<div style={stails.fadeIn}>
			<View style={stails.big}>
				<Box sx={stails.box}>
					<div className="row">
						<div className="col-sm-3 returnHome">
							<Link to="/" className="link"><i class="fas fa-backspace"></i>Home</Link>
						</div>
					</div>

					<div className="row">
						<div className="col-10 offset-1 text-center registerText">
							<h3>Create a new account</h3>
							<p>Already have an account? <Link to="/login" className="link">Log in</Link></p>
						</div>
					</div>

					<div className="row">
						<div className="col-10 offset-1 text-center">
							<form noValidate onSubmit={this.onSubmit}>
								{/* Name */}
								<div className="col-8 offset-2">
									<label htmlFor="name">Name:</label>
									<span className="text-light">{errors.name}</span>
									<input
										type="text"
										onChange={this.onChange}
										value={this.state.name}
										error={errors.name}
										id="name"
										className={classnames("form-control", { invalid: errors.name })}
										placeholder="Your name"
									/>
								</div>

								{/* Email */}
								<div className="col-8 offset-2">
									<label htmlFor="email">Email:</label>
									<span className="text-light">{errors.email}</span>
									<input
										type="email"
										onChange={this.onChange}
										value={this.state.email}
										error={errors.email}
										id="email"
										className={classnames("form-control", { invalid: errors.email })}
										placeholder="Your email"
									/>
								</div>

								{/* Password */}
								<div className="col-8 offset-2">
									<label htmlFor="password">Password:</label>
									<span className="text-light">{errors.password}</span>
									<input
										type="password"
										onChange={this.onChange}
										value={this.state.password}
										error={errors.password}
										id="password"
										className={classnames("form-control", { invalid: errors.password })}
										placeholder="Create a password"
									/>
								</div>

								{/* Validate password */}
								<div className="col-8 offset-2">
									<label htmlFor="password2">Confirm password:</label>
									<span className="text-light">{errors.password2}</span>
									<input
										type="password"
										onChange={this.onChange}
										value={this.state.password2}
										error={errors.password2}
										id="password2"
										className={classnames("form-control", { invalid: errors.password2 })}
										placeholder="Re-enter your password"
									/>
								</div>

								{/* Submit button */}
								<div className="col-8 offset-2">
									<button className="btn signupbtn" type="submit">
										Sign up
									</button>
								</div>
							</form>
						</div>
					</div>
				</Box>
			</View>
			</div>
			</StyleRoot>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser }) (withRouter(Register));
