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
	state = {
		changeMainView: this.props.changeMainView,
		open: false
	};

	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		// I don't think we have to worry about issues of double-updating state because header and
		// main view are two completely separate elements.
		this.state.changeMainView(event.target.id);

		this.setState({ open: false });
	};


	handleClickAway = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

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


	render()
	{
		const { classes, user } = this.props;
		const { open } = this.state;

		let userName = user !== null ? this.getUsername(user) : "ERR NULL";
		let userRole = user !== null ? user['role'] : "ERR NULL";
		let userInitials = "AB";

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>

						<div>
							<Button buttonRef={node => {this.anchorEl = node;}} aria-owns={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={this.handleToggle}>
								Advisees
							</Button>
							<Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
								{({ TransitionProps, placement }) => (
									<Grow
										{...TransitionProps}
										id="menu-list-grow"
										style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
									>
										<Paper>
											<ClickAwayListener onClickAway={this.handleClickAway}>
												<MenuList>
													<MenuItem id="my_advisees" onClick={this.handleClose}>My Advisees</MenuItem>
													<MenuItem id="all_advisees" onClick={this.handleClose}>All Advisees</MenuItem>
												</MenuList>
											</ClickAwayListener>
										</Paper>
									</Grow>
								)}
							</Popper>
						</div>


						{/*{*/}
							{/*this.state.redirect_to !== "" ?*/}
								{/*<Redirect to={{*/}
									{/*pathname: this.state.redirect_to,*/}
									{/*state: {user: this.state.user}*/}
								{/*}}/> :*/}
							{/*""*/}
						{/*}*/}

						<p className={classes.grow}/>

						{userName} ({userRole})

						<Avatar className={classes.avatar}>{userInitials}</Avatar>

						<Button color="inherit">Log Out</Button>
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