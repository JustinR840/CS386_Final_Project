import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import MenuListComposition from "./MenuListComposition";
import {green} from "@material-ui/core/colors";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {Redirect} from "react-router-dom";

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

class Header extends React.Component {
	state = {
		user: this.props.user,
		open: false,
		redirect_to: ""
	};

	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ redirect_to: "/" + event.target.id, open: false });
	};


	render()
	{
		const { classes } = this.props;
		const { open } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>

						<div>
							<Button
								buttonRef={node => {
									this.anchorEl = node;
								}}
								aria-owns={open ? 'menu-list-grow' : undefined}
								aria-haspopup="true"
								onClick={this.handleToggle}
							>
								Toggle Menu Grow
							</Button>
							<Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
								{({ TransitionProps, placement }) => (
									<Grow
										{...TransitionProps}
										id="menu-list-grow"
										style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
									>
										<Paper>
											<ClickAwayListener onClickAway={this.handleClose}>
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


						{
							this.state.redirect_to !== "" ?
								<Redirect to={{
									pathname: this.state.redirect_to,
									state: {user: this.state.user}
								}}/> :
							""
						}


						{/*<MenuList menuName={"Sessions"}>*/}
						{/*	<MenuItem onClick={console.log("hi")}>Upcoming</MenuItem>*/}
						{/*	<MenuItem onClick={console.log("hi")}>Past</MenuItem>*/}
						{/*	<MenuItem onClick={console.log("hi")}>Cancelled</MenuItem>*/}
						{/*	<MenuItem onClick={console.log("hi")}>New</MenuItem>*/}
						{/*</MenuList>*/}

						{/*/!*Should reuse this component by passing in props for things such as menu name and options*!/*/}
						{/*<MenuListComposition menuName ={'Advisees'} itemNames={this.props.itemNames}/>*/}

						<p className={classes.grow}/>

						{this.props.userName} ({this.props.userType})

						<Avatar className={classes.avatar}>{this.props.userInitials}</Avatar>

						<Button color="inherit">Log Out</Button>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);