import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import MenuListComposition from "./MenuListComposition";

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

function AdviseeHeader(props) {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<MenuListComposition menuName ={'Sessions'} itemNames={['Upcoming', 'Past', 'Cancelled', 'New']}/>

					{/*Should reuse this component by passing in props for things such as menu name and options*/}
					<MenuListComposition menuName ={props.headerTwo} itemNames={props.itemNames}/>

					<p className={classes.grow}/>

					{props.userName} ({props.userType}).

					<Avatar alt="Mr Erei" src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/14/1431c4dd8fa5afcd314cd5cdf78b9ad8d49556fb_full.jpg" className={classes.avatar} />

					<Button color="inherit">Log Out</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}

AdviseeHeader.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdviseeHeader);
