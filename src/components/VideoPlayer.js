import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = (props) => {
	let preview_delay = 4000;

	React.useEffect(() => {
		updateSource();
	}, []);

	const [source, setSource] = React.useState(
		'http://192.168.1.105/html/cam_pic.php?time=' +
			new Date().getTime() +
			'&pDelay=' +
			preview_delay
	);

	const updateSource = () => {
		setInterval(() => {
			setSource(
				'http://192.168.1.105/html/cam_pic.php?time=' +
					new Date().getTime() +
					'&pDelay=' +
					preview_delay
			);
		}, 50);
	};
	return <img src={source}></img>;
};

export default VideoPlayer;
