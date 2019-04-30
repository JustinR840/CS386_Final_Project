import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	root: {
		display: 'flex',
	},
});

class MenuListComposition extends Component {
	state = {
		open: false,
	};

	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ open: false });
	};

	render() {
		const { menuName, itemNames, classes } = this.props;
		const { open } = this.state;

		console.log(menuName);
		console.log(itemNames);

		return (
			<div className={classes.root}>
				<div>
					<Button color="inherit" buttonRef={node => {this.anchorEl = node;}} aria-owns={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={this.handleToggle}>
						<p>{menuName}</p>
					</Button>
					<Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
						{({ TransitionProps, placement }) => (
							<Grow{...TransitionProps} id="menu-list-grow" style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
								<Paper>
									<ClickAwayListener onClickAway={this.handleClose}>
										<MenuList>
											{
												itemNames.map((item_name, idx) => <MenuItem onClick={this.handleClose}>{item_name}</MenuItem>)
											}
										</MenuList>
									</ClickAwayListener>
								</Paper>
							</Grow>
						)}
					</Popper>
				</div>
			</div>
		);
	}
}

MenuListComposition.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);
