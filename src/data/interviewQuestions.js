import { v4 as uuidv4 } from 'uuid';

// A series of interview questions used to construct the lists
// Questions all taken from: legacyproject.org
const interviewQuestions = {
	Childhood: [
		{
			id: uuidv4(),
			content: 'What’s your first, most vivid memory?',
		},
		{
			id: uuidv4(),
			content:
				'What was the apartment or house like that you grew up in? How many bedrooms did it have? Bathrooms? What was your bedroom like?',
		},
		{
			id: uuidv4(),
			content: 'Can you describe the neighborhood you grew up in?',
		},
		{
			id: uuidv4(),
			content:
				'Tell me about your parents. Where were they born? When were they born? What memories do you have of them?',
		},
		{
			id: uuidv4(),
			content:
				'Who was more strict: your mother or your father? Do you have a vivid memory of something you did that you were disciplined for?',
		},
	],
	'The Present': [
		{
			id: uuidv4(),
			content: 'Do you have any hobbies or special interests? Do you enjoy any particular sports?',
		},
		{
			id: uuidv4(),
			content:
				'What’s your typical day like now? How is it different from your daily routines in the past?',
		},
		{
			id: uuidv4(),
			content: 'Is the present better or worse than when you were younger?',
		},
		{
			id: uuidv4(),
			content: 'What do you do for fun?',
		},
		{
			id: uuidv4(),
			content: 'Who do you trust and depend on?',
		},
	],
	Aging: [
		{
			id: uuidv4(),
			content:
				'What do you remember about your 20s? 30s? 40s? 50s? 60s? What events stand out in your mind? How was each age different from the one before it?',
		},
		{
			id: uuidv4(),
			content:
				'There are some ages we don’t look forward to. What birthday were you least enthusiastic about? Why?',
		},
		{
			id: uuidv4(),
			content: 'If you could go back to any age, which age would it be and why?',
		},
		{
			id: uuidv4(),
			content:
				'How do you feel now about growing old? What’s the hardest thing about growing older? The best thing?',
		},
		{
			id: uuidv4(),
			content: 'What were your parents like when they got older??',
		},
	],
};
export default interviewQuestions;
