import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
});


function MaterialTable(props) {
	const { classes, headerNames, rowIndexes, rows } = props;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{headerNames.map((v, idx) => (
							idx === 0 ?
							<TableCell key={idx}>{v}</TableCell> :
							<TableCell key={idx} align="right">{v}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, idx1) => (
						<TableRow key={idx1}>
							{rowIndexes.map((v, idx2) => (
								idx2 === 0 ?
								<TableCell key={idx2} component="th" scope="row">{row[v]}</TableCell> :
								<TableCell key={idx2} align="right">{row[v]}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}

MaterialTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialTable);