import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


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
	},
});

function LoginBox(props) {
	let { handleSubmit, handleInputChange, info_error, classes } = props;

	return (
		<main className={classes.main}>
			<CssBaseline/>
			<Paper className={classes.paper} onSubmit={handleSubmit}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				{info_error === true ? <Typography color="error" variant="subtitle1">Invalid Username or Password</Typography> : ''}
				<form className={classes.form}>
					<FormControl margin="normal" onChange={handleInputChange} fullWidth>
						<TextField id="user_id" name="user_id" autoComplete="user_id" variant="outlined" label="User ID" error={info_error} required autoFocus/>
					</FormControl>
					<FormControl margin="normal" onChange={handleInputChange} fullWidth>
						<TextField name="password" type="password" id="password" variant="outlined" label="Password" error={info_error} required autoComplete="current-password"/>
					</FormControl>
					<Button className={classes.submit} color="primary" variant="contained" type="submit">
						Sign In
					</Button>
				</form>
			</Paper>
		</main>
	);
}

LoginBox.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginBox);