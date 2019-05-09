import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactDOM from "react-dom";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";


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
	form: {
		marginTop: theme.spacing.unit,
	},
	formControl: {
		minWidth: 120,
	},
	submit: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	}
});


class BlockCreatorBox extends React.Component {
	state = {
		start_time: '',
		session_length: '',
		num_sessions: '',
		labelWidth: 0,
		callMe: this.props.handleSubmit
	};

	onSubmit = event =>
	{
		event.preventDefault();

		let { start_time, session_length, num_sessions } = this.state;

		this.state.callMe({
			start_time: start_time,
			session_length: session_length,
			num_sessions: num_sessions
		});
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {

		let { classes } = this.props;

		return (
			<main className={classes.main}>
				<Paper className={classes.paper} onSubmit={this.onSubmit}>

					<Typography component="h1" variant="h5">
						Create New Block
					</Typography>

					<form className={classes.form}>

						<FormControl className={classes.formControl} margin="normal" onChange={this.handleChange} fullWidth>
							<TextField id="start_time" name="start_time" label="Start Time" type="datetime-local" value={this.state.start_time} InputLabelProps={{shrink: true,}} required/>
						</FormControl>

						<FormControl className={classes.formControl} margin="normal" onChange={this.handleChange} fullWidth>
							<TextField name="num_sessions" id="num_sessions" label="Number of Sessions" value={this.state.num_sessions} required/>
						</FormControl>

						<FormControl className={classes.formControl} margin="normal" fullWidth>
							<InputLabel>Session Length</InputLabel>
							<Select value={this.state.session_length} onChange={this.handleChange} name="session_length" id="session_length" required>
								<MenuItem value={20}>20 Minutes</MenuItem>
								<MenuItem value={25}>25 Minutes</MenuItem>
								<MenuItem value={30}>30 Minutes</MenuItem>
							</Select>
						</FormControl>

						<Button className={classes.submit} color="primary" variant="contained" type="submit">
							Create Block
						</Button>
					</form>
				</Paper>
			</main>
		);
	}
}


BlockCreatorBox.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlockCreatorBox);