import React from 'react';

const SOURCE_ADDRESS = process.env.REACT_APP_RASPBERRY_PI_URL + '/html/cam_pic.php?time=';

const VideoPlayer = (props) => {
	let preview_delay = 4000;

	React.useEffect(() => {
		updateSource();
	}, []);

	const [source, setSource] = React.useState(
		SOURCE_ADDRESS + new Date().getTime() + '&pDelay=' + preview_delay
	);

	const updateSource = () => {
		setInterval(() => {
			setSource(SOURCE_ADDRESS + new Date().getTime() + '&pDelay=' + preview_delay);
		}, 50);
	};
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
