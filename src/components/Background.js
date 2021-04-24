import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

export default function CenteredGrid(props) {
	const classes = useStyles();
	return (
		<Container className={classes.root} maxWidth='lg'>
			<Grid container spacing={3}>
				{props.children.map((child) => {
					return (
						<Grid item xs={12}>
							{child}
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
}
