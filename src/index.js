import React from 'react';
import ReactDOM from 'react-dom';
import InterviewQuestionList from './components/InterviewQuestionList';
import VideoPlayer from './components/VideoPlayer';
import CameraControls from './components/CameraControls';
import VideoDownload from './components/VideoDownload';
import App from './App';

function QuoteApp() {
	return (
		<App>
			<VideoDownload></VideoDownload>
			<CameraControls></CameraControls>
			<VideoPlayer />
			<InterviewQuestionList />
		</App>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<QuoteApp />, rootElement);
