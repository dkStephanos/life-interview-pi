import React from 'react';
import ReactDOM from 'react-dom';
import InterviewQuestionList from './components/InterviewQuestionList';
import VideoPlayer from './components/VideoPlayer';

function QuoteApp() {
	return (
		<div>
			<VideoPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />

			<InterviewQuestionList />
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<QuoteApp />, rootElement);
