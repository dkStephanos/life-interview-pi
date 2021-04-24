import React from 'react';
import ReactDOM from 'react-dom';
import InterviewQuestionList from './components/InterviewQuestionList';
import VideoPlayer from './components/VideoPlayer';
import Background from './components/Background';

function QuoteApp() {
	return (
		<Background>
			<VideoPlayer url='http://192.168.1.105:9000/mjpg' />
			<InterviewQuestionList />
		</Background>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<QuoteApp />, rootElement);
