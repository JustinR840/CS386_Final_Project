import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";

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
	},
});

class AdviseeHeader extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			changeMainView: props.changeMainView,
			advisors: props.itemNames,
			anchorE1: null,
			open: false,
			placement: null,
			currentlyOpenMenu:""
		};
	}

	handleClick = event =>{
		const {currentTarget} = event;
		let placement = "bottom";
		this.setState(state => ({
			anchorEl: currentTarget,
			open: state.placement !== placement || !state.open,
			placement,
			currentlyOpenMenu: currentTarget.id
		}));
	};

	handleClose = event =>{
		this.state.changeMainView(event.target.id);
		this.setState({open:false});
	};

	handleClickAway = event =>{
		this.setState({open: false});
	};

	getUsername(user)
	{
		// This is all just code to set the username next to the logout button.
		let fName = user['fName'];
		let lName = user['lName'];
		let userName = "";

		if(fName !== null)
		{
			userName += fName;
			// Try appending lName to the userName also.
			if(lName !== null)
			{
				userName += " " + lName;
			}
		}
		else
		{
			// Fallback to using the user_id as a display name if fName is null.
			userName = this.state.user['user_id'];
		}

		return userName;
	}

	getUserInitials(user){
		let fName = user['fName'];
		let lName = user['lName'];
		return fName.charAt(0) + lName.charAt(0);

	}

	getCurrentMenuItems()
	{
		let {currentlyOpenMenu} = this.state;

		if(currentlyOpenMenu === "sessions")
		{
			return (
				<div>
					<MenuItem id="upcoming_sessions" onClick={this.handleClose}>Upcoming Sessions</MenuItem>
					<Divider/>
					<MenuItem id="past_sessions" onClick={this.handleClose}>Past Sessions</MenuItem>
					<Divider/>
					<MenuItem id="cancelled_sessions" onClick={this.handleClose}>Cancelled Sessions</MenuItem>
				</div>
			)
		}
		else if (currentlyOpenMenu === "advisors")
		{
			console.log(this.props.advisor);
			if(this.props.advisorNames.length === 1){
			return (
				<div>
					<MenuItem id={this.props.advisors[0]['advisor_id']} name={this.props.advisorNames[0]} onClick={this.handleClose}>{this.props.advisorNames[0]}</MenuItem>
				</div>
			)};
			if(this.props.advisorNames.length === 2){
			return (
				<div>
					<MenuItem id={this.props.advisors[0]['advisor_id']} name={this.props.advisorNames[0]} onClick={this.handleClose}>{this.props.advisorNames[0]}</MenuItem>
					<MenuItem id={this.props.advisors[1]['advisor_id']} name={this.props.advisorNames[1]} onClick={this.handleClose}>{this.props.advisorNames[1]}</MenuItem>
				</div>
			)};
		}
	}
	render()
	{
		let { classes, user, setUser } = this.props;
		let { anchorEl, open, placement } = this.state;
		let userName = this.getUsername(user);
		let userInitials = this.getUserInitials(user);
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

						<Button color="inherit" id="sessions" onClick={this.handleClick}>Sessions</Button>
						<Button color="inherit" id="advisors" onClick={this.handleClick}>Advisors</Button>

						<p className={classes.grow}/>

						{userName} ({'Advisee'})

						<Avatar className={classes.avatar}>{userInitials}</Avatar>

						<Button color="inherit" onClick={() => setUser(null)}>Log Out</Button>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

AdviseeHeader.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdviseeHeader);
