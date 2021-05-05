import React from 'react';
// Presentational components
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Used to perform the encryption
const crypto = require('crypto');

// This function composes the camera controls component and contains the functionality for encrypting the messages
export default function CameraControls(props) {
	// The algorithm, secrety key (from the .env) and a generated iv used for encryption
	const algorithm = 'aes-256-ctr';
	const secretKey = process.env.REACT_APP_SECRET_KEY;
	const iv = crypto.randomBytes(16);

	// The encrypt callback used to encode the messages to be sent to the mqtt broker
	const encrypt = (text) => {
		// creates the cipher with the configured inputs
		const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
		// applies the ciper to the text to encrypt and creates an encrpyted buffer object
		const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

		// converts the iv and command to a JSON object to be transmitted
		return JSON.stringify({
			iv: iv.toString('hex'),
			content: encrypted.toString('hex'),
		});
	};

	// The component itself as it appears on screen with UP, LEFT, RIGHT, DOWN buttons
	return (
		<Container
			style={{
				width: 'fit-content',
				position: 'absolute',
				top: '0px',
				right: '0px',
				border: '2px solid lightgrey',
				background: 'rgba(255,255,255,.5)',
			}}>
			<Typography
				variant='body1'
				style={{ paddingTop: '5px', textAlign: 'center', color: 'black' }}>
				Camera Controls:
			</Typography>
			<Grid style={{ paddingBottom: '10px' }} container>
				<Grid item xs={3}>
					<Button
						// This callback publishes the mqtt message using the client from props and the corresponding command encrypted command message
						onClick={() => props.client.publish('pub/camera_controls', encrypt('up'))}
						style={{ width: '40px' }}
						variant='outlined'>
						Up
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button
						// This callback publishes the mqtt message using the client from props and the corresponding command encrypted command message
						onClick={() => props.client.publish('pub/camera_controls', encrypt('down'))}
						style={{ width: '40px' }}
						variant='outlined'>
						Down
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button
						// This callback publishes the mqtt message using the client from props and the corresponding command encrypted command message
						onClick={() => props.client.publish('pub/camera_controls', encrypt('left'))}
						style={{ width: '40px' }}
						variant='outlined'>
						Left
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button
						// This callback publishes the mqtt message using the client from props and the corresponding command encrypted command message
						onClick={() => props.client.publish('pub/camera_controls', encrypt('right'))}
						style={{ width: '40px' }}
						variant='outlined'>
						Right
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}
