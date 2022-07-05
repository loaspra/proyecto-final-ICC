import React, {Component} from "react";
import { View, Text } from "react-native-web";
import { Link , Outlet } from "react-router-dom";
import U_form from "../file-m/uploadform";
import "../layout/style.css"

class OCRpage extends Component {
	render() {
		return (
			<View>
				<Text>Testing OCR Component</Text>
				<U_form />
			</View>
		);
	}
}
export default OCRpage;