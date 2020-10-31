import React, { Component } from 'react';
import '../styles/Order.css';
import Moment from 'react-moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export function Order({ info }) {
	const dateToFormat = new Date(info.timestamp);
    const price = () => {
        let sum = 0;
        info.orderLines.forEach(i => {
            sum += i.item.price * i.amount;
        });
        return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

	return (
        <TableContainer component={Paper} className="table">
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell align="left" className="head">
                            <Moment format="YYYY/MM/DD">
                                {dateToFormat}
                            </Moment>
                        </TableCell>
                        <TableCell align="center" className="cell">{info.store.name}</TableCell>
                        <TableCell align="right" className="cell">{price()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
	);
}
export default Order;