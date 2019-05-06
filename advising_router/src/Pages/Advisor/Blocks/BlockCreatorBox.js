import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
	main: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		marginTop: theme.spacing.unit,
	},
	submit: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	}
});

function BlockCreatorBox(props) {
	let { handleSubmit, handleInputChange, info_error, classes } = props;

	return (
		<main className={classes.main}>
			<CssBaseline/>
			<Paper className={classes.paper} onSubmit={handleSubmit}>

				<Typography component="h1" variant="h5">
					Create New Block
				</Typography>
				{info_error === true ? <Typography color="error" variant="subtitle1">Invalid Username or Password</Typography> : ''}
				<form className={classes.form}>
					<FormControl margin="normal" onChange={handleInputChange} fullWidth>
						<TextField id="start_time" label="Start Time" variant="outlined" type="datetime-local" InputLabelProps={{shrink: true,}} required error={info_error}/>
						{/*<TextField name="start_time" id="start_time" variant="outlined" label="Start Time" error={info_error} required/>*/}
					</FormControl>
					<FormControl margin="normal" onChange={handleInputChange} fullWidth>
						<TextField id="end_time" label="End Time" variant="outlined" type="datetime-local" InputLabelProps={{shrink: true,}} required error={info_error}/>
						{/*<TextField name="end_time" id="end_time" variant="outlined" label="End Time" error={info_error} required/>*/}
					</FormControl>
					<FormControl margin="normal" onChange={handleInputChange} fullWidth>
						<TextField name="num_sessions" id="num_sessions" variant="outlined" label="Number of Sessions" error={info_error} required/>
					</FormControl>
					<Button className={classes.submit} color="primary" variant="contained" type="submit">
						Create Block
					</Button>
				</form>
			</Paper>
		</main>
	);
}

BlockCreatorBox.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlockCreatorBox);