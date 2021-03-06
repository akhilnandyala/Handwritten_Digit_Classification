import React from 'react';
import {Component}  from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFile: null,
            isSelected: false,
            image: null,
            prediction: null
        };
    };

	onFileChange = event => {
	    this.setState({ selectedFile: event.target.files[0], isSelected:true });
	};

	onFileUpload = () => {
	    let img = new Image()
        img.src = URL.createObjectURL(this.state.selectedFile)
        img.onload = () => {
        if (img.width <= 28 && img.height <= 28 ){
        this.setState({image: URL.createObjectURL(this.state.selectedFile)});
        const formData = new FormData();
        formData.append(
            "image",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log(formData)
        console.log(this.state.selectedFile);
        axios.post("/upload", formData).then((response) => {
        console.log(response.data)});
            }
        else {
        alert('Please select an image of dimensions 28x28')}
        }
    }

	onFilePredict = () => {
	    console.log(this.state.selectedFile.name)
	    axios.get("/predict", {params: {'uploaded_file_name':this.state.selectedFile.name}}).then((response) => {
	    console.log(response.data['class']);
	    this.setState({ prediction: response.data['class']})
	    console.log(this.state.prediction)
	        });
	};

	render() {
	    return (
            <div class='main_container'>
                <div class='title'><b><h1>Handwritten Digit Recognition</h1></b></div>
                <div class='sub_container'>
                    <p><b> Upload an image containing a handwritten digit </b></p>
                    <input type="file" onChange={this.onFileChange} accept=".jpg,.png" data-cy='file_input' />
                        {
                        this.state.isSelected
                        ?
                        <>
                        <button onClick={this.onFileUpload} data-cy='file_upload'> Upload </button>
                        <img class='image_container' src={this.state.image}/>
                        <button onClick={this.onFilePredict} data-cy='file_predict'> Classify </button>
                        </>
                        :
                        null
                        }
                    <p class='prediction_container'> value: <b>{this.state.prediction}</b> </p>
                </div>
            </div>
	    );
	}
}

export default App;

