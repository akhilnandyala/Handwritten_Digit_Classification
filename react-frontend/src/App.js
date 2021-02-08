import React, { useState, useEffect } from 'react';
import {Component}  from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
	state = {
	    selectedFile: null,
	    prediction: null,
	    image: null
	};

	onFileChange = event => {
	    this.setState({ selectedFile: event.target.files[0] });
	};

	onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);

        axios.post("/upload", formData).then((response) => {
        console.log(response.data)});

        this.setState({image: URL.createObjectURL(this.state.selectedFile)})
	};

	onFilePredict = () => {
	    axios.get("/predict").then((response) => {
	    console.log(response.data['class']);
	    this.setState({ prediction: response.data['class']})
	    console.log(this.state.prediction)
	    });
	}


	render() {
	    return (
            <div>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}> Upload </button>
                    <img src={this.state.image}/>
                    <button onClick={this.onFilePredict}> Predict </button>
                    <p id='image_class'>{this.state.prediction}</p>
                </div>
            </div>
	    );
	}
}

export default App;

