import React from 'react';

// The source address to fetch the updated camera feed from
const SOURCE_ADDRESS = process.env.REACT_APP_RASPBERRY_PI_URL + '/html/cam_pic.php?time=';

// Component used to fetch the updating camera feed and render it out in the dashboard
const VideoPlayer = (props) => {
	let preview_delay = 4000;

	// A hook that triggers when the component mounts in the dom, used o initiate the updateSource method
	React.useEffect(() => {
		updateSource();
	}, []);

	// Internal state used to track the current img source, and update it for the next frame
	const [source, setSource] = React.useState(
		SOURCE_ADDRESS + new Date().getTime() + '&pDelay=' + preview_delay
	);

	// The callback triggered on mount, sets a new source every 50 miliseconds with an updated timestamp that corresponds to the image feed from the apache server
	const updateSource = () => {
		setInterval(() => {
			setSource(SOURCE_ADDRESS + new Date().getTime() + '&pDelay=' + preview_delay);
		}, 50);
	};

	// The presentational component containing the updating img and a wrapping div
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				padding: '25px',
			}}>
			<img src={source}></img>
		</div>
	);
};

export default VideoPlayer;
