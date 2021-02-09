import React from 'react';
import {Component}  from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
	state = {
	    selectedFile: null,
	    image: null,
	    prediction: null
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
            <div class='main_container'>
                <div class='title'><b><h1>Handwritten Digit Recognition</h1></b></div>
                <div class='sub_container'>
                    <p><b> Upload an image containing a handwritten digit </b></p>
                    <input type="file" onChange={this.onFileChange} data-cy='file_input' />
                    <button onClick={this.onFileUpload} data-cy='file_upload'> Upload </button>
                    <img class='image_container' src={this.state.image}/>
                    <button onClick={this.onFilePredict} data-cy='file_predict'> Classify </button>
                    <p class='prediction_container'> value: <b>{this.state.prediction}</b> </p>
                </div>
            </div>
	    );
	}
}

export default App;

