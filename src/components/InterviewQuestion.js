import React, { useState } from 'react';
import { CardActions, Card, CardContent, Button, Typography } from '@material-ui/core';

function InterviewQuestion(props) {
	const [isRecording, setIsRecording] = useState(false);

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
					onClick={() => {
						props.handleRecord(props.questions[props.questionsKey][props.index].content);
						setIsRecording(!isRecording);
					}}>
					{isRecording ? 'recording...' : 'record'}
				</Button>
				{/* <Button
					variant='outlined'
					onClick={() => {
						const newState = props.questions;
						newState[props.questionsKey].splice(props.index, 1);
						setState(newState);
					}}>
					delete
				</Button> */}
			</CardActions>
		</Card>
	);
}

export default InterviewQuestion;
