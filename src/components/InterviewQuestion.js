import React, { useState } from 'react';
import { CardActions, Card, CardContent, Button, Typography } from '@material-ui/core';

// Provides the draggable interview question component
function InterviewQuestion(props) {
	// Internal state used to track wether or not a recording has been inititated
	const [isRecording, setIsRecording] = useState(false);

	// Returns the component that is rendered on screen
	return (
		<Card
			style={{
				backgroundImage: "url('/leaf.jpg')",
				backgroundSize: 'contain',
				backgroundRepeat: 'no-repeat',
			}}>
			<CardContent
				style={{
					display: 'flex',
					justifyContent: 'space-around',
				}}>
				<Typography color='textPrimary' variant='h6'>
					{props.item.content}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant='outlined'
					style={isRecording ? { background: 'crimson' } : {}}
					// This callback uses the handleRecord method as passed by its parent to initiate a recording with the content of this question as an id
					// it then sets its own internal flag to monitor the record status, clicking again will stop the recording
					onClick={() => {
						props.handleRecord(
							props.questions[props.questionsKey][props.index].content,
							isRecording
						);
						setIsRecording(!isRecording);
					}}>
					{isRecording ? 'recording...' : 'record'}
				</Button>
				{
					// Used to add new questions. FUTURE WORK
					/* <Button
					variant='outlined'
					onClick={() => {
						const newState = props.questions;
						newState[props.questionsKey].splice(props.index, 1);
						setState(newState);
					}}>
					delete
				</Button> */
				}
			</CardActions>
		</Card>
	);
}

export default InterviewQuestion;
