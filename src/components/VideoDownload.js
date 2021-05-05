import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

// A button that links to the apache implemented video recordings management screen
export default function VideoDownload(props) {
	return (
		<Container
			style={{
				width: 'fit-content',
				position: 'absolute',
				top: '0px',
				left: '0px',
				background: 'rgba(255,255,255,.5)',
			}}>
			<Button
				onClick={() => window.open(process.env.REACT_APP_RASPBERRY_PI_URL + '/html/preview.php')}
				variant='outlined'>
				Download Recordings
			</Button>
		</Container>
	);
}
