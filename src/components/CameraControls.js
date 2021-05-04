import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const crypto = require('crypto');

export default function CameraControls(props) {
	const algorithm = 'aes-256-ctr';
	const secretKey = process.env.REACT_APP_SECRET_KEY;
	const iv = crypto.randomBytes(16);

	const encrypt = (text) => {
		const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

		const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

		return JSON.stringify({
			iv: iv.toString('hex'),
			content: encrypted.toString('hex'),
		});
	};

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
						onClick={() => props.client.publish('pub/camera_controls', encrypt('up'))}
						style={{ width: '40px' }}
						variant='outlined'>
						Up
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button
						onClick={() => props.client.publish('pub/camera_controls', encrypt('down'))}
						style={{ width: '40px' }}
						variant='outlined'>
						Down
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button
						onClick={() => props.client.publish('pub/camera_controls', encrypt('left'))}
						style={{ width: '40px' }}
						variant='outlined'>
						Left
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button
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
