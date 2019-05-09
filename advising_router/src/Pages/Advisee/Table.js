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
    width: '90%',
    marginLeft: 8,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
    maxWidth: 800
  },
});

function TableHeadElement(props) {
  const { titles } = props;
  return (
    <TableHead>
    <TableRow>
      {
        titles.map((title, idx) => <TableCell key={idx}
        align="left">{title}</TableCell>)
      }
    </TableRow>
  </TableHead>
  );
}

const TableRowElement = (props) => {
  const {row, attributes} = props;
  return (
        <TableRow key={row.id}>
          {
            attributes.map((attribute, idx) => {
              return idx === 0?
                <TableCell key={idx} component="th" scope="row">{row[attribute]}</TableCell> :
                <TableCell key={idx} align="left">{row[attribute]}</TableCell>;
            })
          }
        </TableRow>
       );
    }

function SimpleTable(props) {
  const { classes, titles, attributes, tuples } = props;
  return (
    <Paper className={classes.root}>
      <Table style={{paddingLeft: 8}} className={classes.table}>
        <TableHeadElement titles={titles}/>
        <TableBody>
          {tuples.map((row, idx) => (
            <TableRowElement key={idx} row={row} attributes={attributes}/>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
