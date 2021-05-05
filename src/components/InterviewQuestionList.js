import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Library used to enable drag and drop
import { Accordion, AccordionSummary } from '@material-ui/core';

// The component and data used for the actual questions
import interviewQuestions from '../data/interviewQuestions';
import InterviewQuestion from './InterviewQuestion';

// Callback used to rearange the interview questions within and between lists
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

// Used to style the list and questions
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

// The actual InterviewQuestionList component
const InterviewQuestionList = (props) => {
	// Internal state intiated from the interviewQuestions file
	const [questions, setQuestions] = useState(interviewQuestions);

	// The handleRecord callback passed through to the interview questions. Makes a call to the apache server to iniatiate/stop the recording
	const handleRecord = (question, isRecording) => {
		let wind = isRecording
			? window.open(process.env.REACT_APP_RASPBERRY_PI_URL + '/html/cmd_pipe.php?cmd=ca%200')
			: window.open(process.env.REACT_APP_RASPBERRY_PI_URL + '/html/cmd_pipe.php?cmd=ca%201');
		setTimeout(() => {
			wind.close();
		}, 10);
	};

	// Callback that fires when an interview question is dropped. Identifies wether the list changed, and moves the cards around accordingly, updating state
	function onDragEnd(result) {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		// If we dropped in a list, get the source and destination keys
		const sKey = source.droppableId;
		const dKey = destination.droppableId;

		// If the keys match, reorder within the same lists and update state
		if (sKey === dKey) {
			const items = reorder(questions[sKey], source.index, destination.index);
			const newState = questions;
			newState[sKey] = items;
			setQuestions(newState);
		} else {
			// If they don't, move the question to the new list, and then update everything
			const result = move(questions[sKey], questions[dKey], source, destination, questions);
			const newState = questions;
			newState[sKey] = result[sKey];
			newState[dKey] = result[dKey];

			setQuestions(newState);
		}
	}

	// Returns the presentational component, this is where we inject callbacks into the children
	return (
		<div>
			{
				// Used to add aditional lists. FUTURE WORK
				/* <Button
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
			</Button> */
			}
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
										{
											// Here we map through the questions, and create a component for each, passing them styles and the handleRecord callback
											questions[key].map((item, index) => (
												<div>
													<Draggable key={key + '-' + item.id} draggableId={item.id} index={index}>
														{(provided, snapshot) => (
															<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																style={{
																	...getItemStyle(
																		snapshot.isDragging,
																		provided.draggableProps.style
																	),
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
											))
										}
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
