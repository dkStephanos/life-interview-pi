import React from 'react';
import ReactDOM from 'react-dom';
import InterviewQuestionList from './components/InterviewQuestionList';
import VideoPlayer from './components/VideoPlayer';
import CameraControls from './components/CameraControls';
import VideoDownload from './components/VideoDownload';
import App from './components/App';

// The wrapper for the dashboard, what is inserted into the dom
function LifeInterviewDashboard() {
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
ReactDOM.render(<LifeInterviewDashboard />, rootElement);
