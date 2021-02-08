import React, { useState, useEffect } from 'react';
import {Component}  from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
	state = {
	    selectedFile: null
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

        axios.post("http://localhost:5000/message", formData);
	};


	render() {
	    return (
            <div>
                <h1>
                GeeksforGeeks
                </h1>
                <h3>
                File Upload using React!
                </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                    Upload!
                    </button>
                </div>
            </div>
	    );
	}
}

export default App;

