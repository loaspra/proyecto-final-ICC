import React, { Component } from 'react';
import {Text, StyleSheet, View} from  'react-native';

import axios from 'axios';
import './styles.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const BASE_URL = 'http://localhost:3001/';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#EEE',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

var styles = StyleSheet.create({headline: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 50,
    backgroundColor: 'Gray'
  },
	subtitle: { textAlign: 'center', // <-- the magic
    fontSize: 20,
    marginTop: 10,
    backgroundColor: 'Gray'}
})  

class U_form extends Component {
	constructor(props) {
	
	super(props);
	  this.state = {
		selectedFile: null,
		respuesta: 'Aqui aparecera el texto identificado',
		id: this.props.id,
		rest: this.props.rest
	  }   
	  console.log("Construction U_form object with");
	  console.log(this.state.id);
	  console.log(this.state.rest);
	};

	changeHandler = event=>{
	var uploadFile = event.target.files[0];    
		if(this.validateFileSize(event)){
		  this.setState({
			selectedFile: uploadFile
		  });
		}
	}
	
	fileUpload = () => {
	const formData = new FormData(); 
	if (this.state.rest <= 0) {
		console.log("No tienes conversiones restantes")
		return;
	}
	formData.append('file', this.state.selectedFile)    
	formData.append('id', this.state.id)
	console.log("hello> " + this.state.id)
	axios.post(BASE_URL + 'upload', formData)
	  .then(res => {
		// toast.success('File uploaded successfully')
		// pass the name of the file as a parameter to the script (OCR)
			this.setState({respuesta: res.data.results});
			this.setState({rest: res.data.restante})
			console.log(res.data.results);
			console.log("Conversiones restantes: " + this.state.rest);
			this.forceUpdate();
	  })
	  .catch(err => {
		// toast.error('File upload failed')
		console.log(err)
	  })
	};
  
	validateFileSize=(event)=>{
		let uploadFile = event.target.files[0];
		let size = 15000000;
		let err = '';	  
		if (uploadFile.size > size) {
			err = uploadFile.type+' is too large, pleselect a smaller file\n';
			console.log(err);
		}
		return true
	};
	// <ToastContainer /> linea 105

	render() {
	  return (
			<View>
				<Text style={styles.subtitle}>Te quedan {this.state.rest} conversiones a texto restantes</Text>
				<Text style={styles.subtitle}>Carga del Archivo</Text>
		<Box sx={{ flexGrow: 1 }}>
		<Grid
			container
			spacing={10}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '30vh' }}
		>
		  <Grid item xs={4}>
		  <form method="post" action="#" id="#">
		 			<div className="form-group files">

		 				<input type="file" name="file" className="form-control" onChange={this.changeHandler}/>
		 			</div>
		 			<div className="col-md-6 pull-right">
		 				<button disabled={this.state.rest > 0 ? false: true} width="100%" type="button" className="btn btn-info" onClick={this.fileUpload}>Cargar Archivo</button>
		 			</div>
		 		</form>
		  </Grid>
		  <Grid item xs={8}>
			<Item>{this.state.respuesta}</Item>
		  </Grid>
		</Grid>
		<br />
	  </Box>
	  </View>
	  );
	}
}

export default U_form;