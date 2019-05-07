import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import MenuListComposition from "./MenuListComposition";
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
	},
});

/* function AdviseeHeader(props) {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<MenuListComposition menuName ={'Sessions'} itemNames={['Upcoming', 'Past', 'Cancelled']}/>

					{/*Should reuse this component by passing in props for things such as menu name and options}
					<MenuListComposition menuName ={props.headerTwo} itemNames={props.itemNames}/>

					<p className={classes.grow}/>

					{props.userName} ({'Advisee'}).

					<Avatar alt="Mr Erei" src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/14/1431c4dd8fa5afcd314cd5cdf78b9ad8d49556fb_full.jpg" className={classes.avatar} />

					<Button color="inherit">Log Out</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
*/
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

	getCurrentMenuItems()
	{
		let {currentlyOpenMenu} = this.state;

		if(currentlyOpenMenu === "sessions")
		{
			return (
				<div>
				<MenuItem id="upcoming_sessions" onClick={this.handleClose}>Upcoming Sessions</MenuItem>
				<MenuItem id="past_sessions" onClick={this.handleClose}>Past Sessions</MenuItem>
				<MenuItem id="cancelled_sessions" onClick={this.handleClose}>Cancelled Sessions</MenuItem>
				</div>
			)
		}
		else if (currentlyOpenMenu === "advisors")
		{
			return (
				<div>
					<MenuItem id="advisor1" onClick={this.handleClose}>{this.props.advisorNames[0]}</MenuItem>
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
