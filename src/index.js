import React from 'react';
import ReactDOM from 'react-dom';
import InterviewQuestionList from './components/InterviewQuestionList';
import VideoPlayer from './components/VideoPlayer';
import CameraControls from './components/CameraControls';
import App from './App';

function QuoteApp() {
	return (
		<App>
			<CameraControls></CameraControls>
			<VideoPlayer url='http://192.168.1.105:9000/mjpg' />
			<InterviewQuestionList />
		</App>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<QuoteApp />, rootElement);
