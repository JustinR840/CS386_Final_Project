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


class SessionEditorBox extends React.Component {
	state = {
		status: '',
		labelWidth: 0,
		callMe: this.props.handleSubmit
	};

	onSubmit = event =>
	{
		event.preventDefault();

		let { status, notes } = this.state;

		this.state.callMe({
			status: status,
			notes: notes
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
						Edit Session
					</Typography>

					<Typography>Student Name Here (Student ID Here)</Typography>

					<form className={classes.form}>

						<FormControl className={classes.formControl} margin="normal" onChange={this.handleChange} fullWidth>
							<TextField id="notes" name="notes" label="Notes"value={this.state.notes} multiline required/>
						</FormControl>

						<FormControl className={classes.formControl} margin="normal" fullWidth>
							<InputLabel>Session Status</InputLabel>
							<Select value={this.state.status} onChange={this.handleChange} name="status" id="status" required>
								<MenuItem value={"open"}>Open</MenuItem>
								<MenuItem value={"closed"}>Closed</MenuItem>
								<MenuItem value={"cancelled"}>Cancelled</MenuItem>
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


SessionEditorBox.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SessionEditorBox);