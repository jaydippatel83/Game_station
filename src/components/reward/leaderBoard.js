import React, { Fragment, useEffect, useState } from 'react';
import Header from '../Header';
import Leftnav from '../Leftnav';
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { max } from 'date-fns';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import UserData from './UserData';

function LeaderBoard() {
    const { Moralis, user } = useMoralis();
    const [rankData, setRankData] = useState();
    const Points = Moralis.Object.extend("UsePointsTable");
    const query = new Moralis.Query(Points);

    useEffect(async () => {
        query.descending("TotalPoints");
        let data = await query.find();
        data = JSON.parse(JSON.stringify(data));
        data.forEach((e, i) => {
            e.rank = i + 1; 
        });
       
        setRankData(data);
    }, []);

    return (
        <Fragment>
            <Header />
            <Leftnav />
            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className='card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3'>
                            <div className="row feed-body ">
                                <div className='col'>
                                    <Paper sx={{ width: '100%', overflow: 'hidden' }} className='theme-dark-bg'>
                                        <TableContainer sx={{ maxHeight: 440 }}>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead >
                                                    <TableRow>
                                                        <TableCell
                                                            key="ContestId"
                                                            align="left"
                                                            style={{ minWidth: 170 }}
                                                            className='theme-dark-bg h4'
                                                        >
                                                            Rank
                                                        </TableCell>
                                                        <TableCell
                                                            key="startdate"
                                                            align="left"
                                                            style={{ minWidth: 170 }}
                                                            className='theme-dark-bg h4'
                                                        >
                                                            User
                                                        </TableCell>
                                                        <TableCell
                                                            key="enddate"
                                                            align="left"
                                                            style={{ minWidth: 170 }}
                                                            className='theme-dark-bg h4'
                                                        >
                                                            Total SFS Points
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        rankData ? rankData.map((element) => { 
                                                            return (
                                                                <TableRow key={element.rank} hover role="checkbox" tabIndex={-1} >
                                                                    <TableCell align={'left'} className='theme-dark-bg h4'>
                                                                        {element.rank}
                                                                    </TableCell>
                                                                    <TableCell align={'left'} className='theme-dark-bg h4'>
                                                                       {element.user}
                                                                    </TableCell>
                                                                    <TableCell align={'left'} className='theme-dark-bg h4'>
                                                                       {element.TotalPoints}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        }) : <CircularProgress />
                                                    }

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default LeaderBoard;
