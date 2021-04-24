import React from 'react';
import ReactDOM from 'react-dom';
import InterviewQuestionList from './components/InterviewQuestionList';
import VideoPlayer from './components/VideoPlayer';
import Background from './components/Background';

function QuoteApp() {
	return (
		<Background>
			<VideoPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
			<InterviewQuestionList />
		</Background>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<QuoteApp />, rootElement);
