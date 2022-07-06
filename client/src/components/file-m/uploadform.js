import React, { Component, useState } from 'react';
import {Text, StyleSheet, View} from  'react-native';
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import './styles.css';
import { styled } from '@mui/material/styles';
import { Box, alpha} from "@mui/material";
import Spinner from 'react-spinner-material';
import Paper from '@mui/material/Paper';

const BASE_URL = 'http://localhost:3001/';
const fileTypes = ["JPEG", "PNG", "JPG"];

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
    backgroundColor: 'Gray',
	color: 'white'},

	normal: { textAlign: 'center', // <-- the magic
    fontSize: 13,
    marginTop: 5,
	marginBottom: 10,
    backgroundColor: 'Gray',
	color: 'gray'}
})  

const stails ={
	big: {
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 0, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
}


class U_form extends Component {
	constructor(props) {
	
	super(props);
	  this.state = {
		selectedFile: null,
		respuesta: 'Aqui aparecera el texto identificado',
		id: this.props.id,
		rest: this.props.rest,
		hide: false
	  }   
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.respuesta !== this.state.respuesta) {
			// llego la respuesta
			this.setState({
				// respuesta: 'Aqui aparecera el texto identificado',
				hide: false
				}
			)
		}
	}

	changeHandler = event=>{
	var uploadFile = event.item(0);    
		if(this.validateFileSize(event)){
		  this.setState({
			selectedFile: uploadFile,
		  });
		}
	}
	
	fileUpload = () => {
	const formData = new FormData(); 
	if (this.state.rest <= 0) {
		console.log("No tienes conversiones restantes")
		return;
	}
	this.setState({hide: true})
	formData.append('file', this.state.selectedFile)    
	formData.append('id', this.state.id)
	
	axios.post(BASE_URL + 'upload', formData)
	  .then(res => {
		// toast.success('File uploaded successfully')
		// pass the name of the file as a parameter to the script (OCR)
			this.setState({respuesta: res.data.results});
			this.setState({rest: res.data.restante})
			console.log("Conversiones restantes: " + this.state.rest);
			this.forceUpdate();
	  })
	  .catch(err => {
		console.log(err)
	  })
	};
  
	validateFileSize=(event)=>{
		let uploadFile = event.item(0);
		let size = 15000000;
		let err = '';	  
		if (uploadFile.size > size) {
			err = uploadFile.type+' is too large, pleselect a smaller file\n';
			console.log(err);
		}
		return true
	};

	

	render() {
	  return (
	<View sx={stails.big}>
		<Text style={styles.subtitle}>Te quedan {this.state.rest} conversiones a texto restantes</Text>
		<Text style={styles.subtitle}>Carga del Archivo</Text>
		<br/> 
		{ !this.state.hide && <View>
			<FileUploader
				multiple={true}
				handleChange={this.changeHandler}
				name="file"
				types={fileTypes}
			/>
			<Text style={styles.normal}>{this.state.file ? `File name: ${this.state.file.name}` : "Nigún archivo seleccionado aún"}</Text>
			<button disabled={this.state.rest > 0 ? false: true} width="100%" type="button" className="btn btn-info" onClick={this.fileUpload}>Cargar Archivo</button>
			<br />
		</View>}
		<View style={{alignItems: "center"}}>
			<Spinner radius={120} color={"#960035"} stroke={5} visible={this.state.hide} />
		</View>
			<Text style={styles.subtitle}>{this.state.respuesta}</Text>
	</View>
	  );
	}
}

export default U_form;