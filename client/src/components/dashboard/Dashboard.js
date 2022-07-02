import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import './style.css';
import U_form from "../file-m/uploadform";

class Dashboard extends Component {
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};
	render() {
		const { user } = this.props.auth;
		return (
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
