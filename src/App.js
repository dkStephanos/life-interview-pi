import React, { useState, Fragment } from 'react';
import './App.css';
import mqtt from 'mqtt';
import { Container } from '@material-ui/core';

//This object contains the log in info for the mqtt broker -- update to your own settings
var options = {
	username: process.env.REACT_APP_MQTT_USERNAME,
	password: process.env.REACT_APP_MQTT_PASSWORD,
};

//Here, we declare the mqtt client, connecting with the options declared above using a websocket so we can connect via the browser
var client = mqtt.connect(process.env.REACT_APP_MQTT_URL, options);

//Here, we delcare the callback function for the connect. In this case, we want to go ahead and subscribe to the pub/data topic so we can recieve data from the raspberry pi
//We also publish a success message that we can see in the browser to confirm a succesful connection
client.on('connect', function () {
	client.subscribe(process.env.REACT_APP_MQTT_TOPIC, function (err) {
		if (!err) {
			client.publish(process.env.REACT_APP_MQTT_TOPIC, 'Connected to MQTT broker');
		}
	});
});

//This function returns the App component, which serves as a the interface for the mqtt client and the wrapper for the PS3Controller compnent
function App(props) {
	//Here, we delcare a variable to hold the message incoming from the mqtt broker and a callback to be performed upon receiving a message
	//We log the message to the browser console, and set the message to the internal state of App, triggering a re-render so the new data can be injected into the PS3Controller via is properties
	var note;
	client.on('message', function (topic, message) {
		note = message.toString();
		console.log(note);
	});

	const childrenWithProps = React.Children.map(props.children, (child) => {
		// checking isValidElement is the safe way and avoids a typescript error too
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { client: client });
		}
		return child;
	});

	return (
		<div
			className='App'
			style={{
				backgroundImage: "url('/background.jpg')",
				filter: 'grayscale(80%)',
			}}>
			<Container className='App-body'>{childrenWithProps}</Container>
		</div>
	);
}

export default App;
