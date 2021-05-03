import React, { useState, Fragment } from 'react';
import './App.css';
import mqtt from 'mqtt';
import { Container } from '@material-ui/core';

//This object contains the log in info for the mqtt broker -- update to your own settings
var options = {
	username: 'koiserve',
	password: 'Tarnoff',
};

//Here, we declare the mqtt client, connecting with the options declared above using a websocket so we can connect via the browser
// var client = mqtt.connect('ws://192.168.1.107:9001/', options);

// //Here, we delcare the callback function for the connect. In this case, we want to go ahead and subscribe to the pub/data topic so we can recieve data from the raspberry pi
// //We also publish a success message that we can see in the browser to confirm a succesful connection
// client.on('connect', function () {
// 	client.subscribe('pub/data', function (err) {
// 		if (!err) {
// 			client.publish('pub/data', 'Connected to MQTT broker');
// 		}
// 	});
// });

//This function returns the App component, which serves as a the interface for the mqtt client and the wrapper for the PS3Controller compnent
function App(props) {
	//Here, we delcare a variable to hold the message incoming from the mqtt broker and a callback to be performed upon receiving a message
	//We log the message to the browser console, and set the message to the internal state of App, triggering a re-render so the new data can be injected into the PS3Controller via is properties
	var note;
	// client.on('message', function (topic, message) {
	// 	note = message.toString();
	// 	// Updates React state with message
	// 	setMesg(note);
	// 	console.log(note);
	// });

	return (
		<div
			className='App'
			style={{
				backgroundImage: "url('/background.jpg')",
				filter: 'grayscale(80%)',
			}}>
			<Container className='App-body'>{props.children}</Container>
		</div>
	);
}

export default App;
