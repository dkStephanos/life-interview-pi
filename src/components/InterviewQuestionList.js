import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Accordion, AccordionSummary } from '@material-ui/core';

import interviewQuestions from '../data/interviewQuestions';
import InterviewQuestion from './InterviewQuestion';

// fake data generator
const getItems = (count, offset = 0) =>
	Array.from({ length: count }, (v, k) => k).map((k) => ({
		id: `item-${k + offset}-${new Date().getTime()}`,
		content: `item ${k + offset}`,
	}));

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination, questions) => {
	console.log(
		'Inside move w/ source, destination, droppableSource, droppableDestination',
		source,
		destination,
		droppableSource,
		droppableDestination,
		questions
	);
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'white',

	// styles we need to apply on draggables
	...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : 'rgba(255,255,255,.5)',
	padding: grid,
	width: 250,
});

const InterviewQuestionList = (props) => {
	const [questions, setQuestions] = useState(interviewQuestions);

	const handleRecord = (question, isRecording) => {
		console.log('Starting recording for ', question);
		let wind = isRecording
			? window.open(process.env.REACT_APP_RASPBERRY_PI_URL + '/html/cmd_pipe.php?cmd=ca%200')
			: window.open(process.env.REACT_APP_RASPBERRY_PI_URL + '/html/cmd_pipe.php?cmd=ca%201');
		setTimeout(() => {
			wind.close();
		}, 10);
	};

	function onDragEnd(result) {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}
		const sKey = source.droppableId;
		const dKey = destination.droppableId;

		if (sKey === dKey) {
			const items = reorder(questions[sKey], source.index, destination.index);
			const newState = questions;
			newState[sKey] = items;
			setQuestions(newState);
		} else {
			const result = move(questions[sKey], questions[dKey], source, destination, questions);
			const newState = questions;
			newState[sKey] = result[sKey];
			newState[dKey] = result[dKey];

			setQuestions(newState);
		}
	}
	return (
		<div>
			{/* <Button
				variant='outlined'
				onClick={() => {
					setState([...state, []]);
				}}>
				Add new group
			</Button>
			<Button
				variant='outlined'
				onClick={() => {
					setState([...state, getItems(1)]);
				}}>
				Add new item
			</Button> */}
			<div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
				<DragDropContext onDragEnd={onDragEnd}>
					{Object.keys(questions).map((key) => (
						<Droppable key={key} droppableId={`${key}`}>
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									style={getListStyle(snapshot.isDraggingOver)}
									{...provided.droppableProps}>
									<Accordion>
										<AccordionSummary
											style={{ border: '2px solid lightgrey', background: 'rgba(255,255,255,.5)' }}>
											{key}
										</AccordionSummary>
										{questions[key].map((item, index) => (
											<div>
												<Draggable key={key + '-' + item.id} draggableId={item.id} index={index}>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={{
																...getItemStyle(snapshot.isDragging, provided.draggableProps.style),
															}}>
															<InterviewQuestion
																item={item}
																index={index}
																questions={questions}
																questionsKey={key}
																handleRecord={handleRecord}></InterviewQuestion>
														</div>
													)}
												</Draggable>
											</div>
										))}
										{provided.placeholder}
									</Accordion>
								</div>
							)}
						</Droppable>
					))}
				</DragDropContext>
			</div>
		</div>
	);
};

export default InterviewQuestionList;
