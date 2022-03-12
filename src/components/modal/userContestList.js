import React, { useEffect, useState } from 'react';
import { Modal, Nav } from "react-bootstrap";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';

import { ToastContainer, toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function UserContestList(props) {

    const { user, Moralis } = useMoralis();
    const { data, isLoading, error } = useMoralisCloudFunction("getAllContestParticipate");
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState();
    const [list, setList] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const JoinCon = Moralis.Object.extend("JoinContest");
    const query = new Moralis.Query(JoinCon);

    useEffect(async () => {
        const joincontest = JSON.parse(JSON.stringify(data));
        setUserData(joincontest);
    }, [isLoading])

    return (
        <div className="">
            <ToastContainer />
            <button onClick={handleShow}style={{border:'none',}} className="p-2  bg-primary-gradiant  me-2 text-white text-center font-xssss fw-600 ls-1 rounded border-none">Check Entries</button>
            <Modal show={show} onHide={handleClose} style={{ overflowY: 'scroll', minWidth: '660px' }}>
                <Modal.Header className='theme-dark-bg' closeButton>
                    <Modal.Title style={{ fontWeight: "600" }}>{props.ele.contestData.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='theme-dark-bg' style={{ padding: "0" }}>
                    <TableContainer className='theme-dark-bg' component={Paper}>
                        <Table sx={{ minWidth: 650 }} style={{ overflowY: 'scroll' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className=' h4'>User</TableCell>
                                    <TableCell className=' h4' align="left">Submited</TableCell>
                                    <TableCell className=' h4' align="left">About</TableCell>
                                    <TableCell className=' h4' align="left">Link </TableCell>
                                    <TableCell className=' h4' align="left">Demo video Link</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className='theme-dark-bg h4'>
                                {
                                    userData ? userData.map((e) => {
                                      
                                       
                                        if (e.contestId == props.ele.objectId) {
                                            return <TableRow key={e.objectId}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" className=' h4'>
                                                    {e.user.objectId}
                                                </TableCell>
                                                <TableCell component="th" scope="row" className=' h4'>
                                                    {e.status == "2" ? "Submited" : "Not Submited"}
                                                </TableCell>
                                                <TableCell component="th" scope="row" className=' h4'>
                                                    {e.status == "2" ? e.joincontestUser.about : "Null"}
                                                </TableCell>
                                                <TableCell component="th" scope="row" className=' h4'>
                                                    {e.status == "2" ? e.joincontestUser.link : "Null"}
                                                </TableCell>
                                                <TableCell component="th" scope="row" className=' h4'>
                                                    {e.status == "2" ? e.joincontestUser.video : "Null"}
                                                </TableCell>
                                            </TableRow>
                                        }
                                    }) : ''
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Modal.Body>
                <Modal.Footer className='theme-dark-bg'>
                    <button className="btn btn-primary" onClick={handleClose} >
                        close
                    </button>
                </Modal.Footer>
            </Modal>

        </div >
    );
}
