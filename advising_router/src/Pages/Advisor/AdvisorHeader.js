import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import {green} from "@material-ui/core/colors";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	button: {
		margin: theme.spacing.unit,
	},
	grow: {
		flexGrow: 1,
	},
	avatar: {
		margin: 10,
		color: '#fff',
		backgroundColor: green[700]
	},
});


class AdvisorHeader extends React.Component {
	constructor(props)
	{
		super(props);

		this.state = {
			changeMainView: props.changeMainView,
			anchorE1: null,
			open: false,
			placement: null,
			currentlyOpenMenu: ""
		};
	}

	handleClick = event =>
	{
		const { currentTarget } = event;
		let placement = "bottom";

		this.setState(state => ({
			anchorEl: currentTarget,
			open: state.placement !== placement || !state.open,
			placement,
			currentlyOpenMenu: currentTarget.id
		}));
	};

	handleClose = event => {
		// I don't think we have to worry about issues of double-updating state because header and
		// main view are two completely separate elements.
		this.state.changeMainView(event.target.id);

		this.setState({ open: false });
	};


	handleClickAway = event => {
		this.setState({ open: false });
	};


	getUsername(user)
	{
		// This is all just code to set the username next to the logout button.
		let fName = user['fName'];
		let lName = user['lName'];
		let userName = "";

		if(fName !== null) {
			userName += fName;
			// Try appending lName to the userName also.
			if(lName !== null)
				userName += " " + lName;
		} else
			// Fallback to using the user_id as a display name if fName is null.
			userName = user['user_id'];

		return userName;
	}


	getCurrentMenuItems()
	{
		let {currentlyOpenMenu} = this.state;

		if(currentlyOpenMenu === "sessions")
		{
			return (
				<div>
					<MenuItem id="my_advisees" onClick={this.handleClose}>My Advisees</MenuItem>
					<MenuItem id="all_advisees" onClick={this.handleClose}>All Advisees</MenuItem>
				</div>
			)
		}
		else if (currentlyOpenMenu === "advisees")
		{
			return (
				<div>
					<MenuItem id="edit_sessions" onClick={this.handleClose}>Edit Sessions</MenuItem>
					<MenuItem id="upcoming_sessions" onClick={this.handleClose}>Upcoming Sessions</MenuItem>
					<MenuItem id="past_sessions" onClick={this.handleClose}>Past Sessions</MenuItem>
					<MenuItem id="future_sessions" onClick={this.handleClose}>Future Sessions</MenuItem>
					<MenuItem id="all_sessions" onClick={this.handleClose}>All Sessions</MenuItem>
				</div>
			)
		}
		else if (currentlyOpenMenu === "blocks")
		{
			return (
				<div>
					<MenuItem id="view_blocks" onClick={this.handleClose}>View Advising Blocks</MenuItem>
					<MenuItem id="create_blocks" onClick={this.handleClose}>Create Advising Blocks</MenuItem>
				</div>
			)
		}
	}


	render()
	{
		let { classes, user, setUser } = this.props;
		let { anchorEl, open, placement } = this.state;

		let userName = this.getUsername(user);
		let userRole = user['role'];
		let userInitials = "AB";

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>

						<Popper open={open} anchorEl={anchorEl} placement={placement} transition>
							{({ TransitionProps }) => (
								<Grow {...TransitionProps}>
									<Paper>
										<ClickAwayListener onClickAway={this.handleClickAway}>
											<MenuList>
												{this.getCurrentMenuItems()}
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>

						<Button id="advisees" onClick={this.handleClick}>Sessions</Button>
						<Button id="blocks" onClick={this.handleClick}>Blocks</Button>
						<Button id="sessions" onClick={this.handleClick}>Advisees</Button>

						<p className={classes.grow}/>

						{userName} ({userRole})

						<Avatar className={classes.avatar}>{userInitials}</Avatar>

						<Button color="inherit" onClick={() => setUser(null)}>Log Out</Button>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

AdvisorHeader.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvisorHeader);
