import React, { Component } from "react";
import { View } from "react-native-web";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import { fadeIn } from "react-animations";
import Radium, {StyleRoot} from "radium";
import { Box, alpha} from "@mui/material";
import background from "../layout/background.jpg";
import classnames from "classnames";
import './Login.css';

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

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {}
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			// Push user to dashboard when they login
			this.props.history.push("/dashboard");
		}
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
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(userData);
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
							<Link to="/" className="link"><i className="fas fa-backspace"></i> Inicio</Link>
						</div>
					</div>

					<div className="row">
						<div className="col-10 offset-1 text-center loginText">
							<h3>Inicia sesión</h3>
							<p>No tienes una cuenta? <Link to="/register" className="link">Registrar</Link></p>
						</div>
					</div>

					<div className="row">
						<div className="col-10 offset-1 text-center">
							<form noValidate onSubmit={this.onSubmit}>
								{/* Email */}
								<div className="col-8 offset-2">
									<label htmlFor="email">Correo:</label>
									<span className="text-danger">{errors.email} {errors.emailnotfound}</span>
									<input
										type="email"
										onChange={this.onChange}
										value={this.state.email}
										error={errors.email}
										id="email"
										className={classnames("form-control", { 
											invalid: errors.email || errors.emailnotfound 
										})}
										placeholder="Ingresa tu correo"
									/>
								</div>

								{/* Password */}
								<div className="col-8 offset-2">
									<label htmlFor="password">Contraseña:</label>
									<span className="text-danger">{errors.password} {errors.passwordincorrect}</span>
									<input
										type="password"
										onChange={this.onChange}
										value={this.state.password}
										error={errors.password}
										id="password"
										className={classnames("form-control", {
											invalid: errors.password || errors.passwordincorrect
										})}
										placeholder="Ingresa tu contraseña"
									/>
								</div>

								{/* Submit button */}
								<div className="col-8 offset-2">
									<button className="btn loginbtn" type="submit">
										Iniciar Sesión
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

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
