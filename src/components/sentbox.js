import React from 'react'
import { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import { Avatar,Box, Typography, Table, TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import axios from 'axios';
import { ActionTypes } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { Star, StarOutline , InfoOutlined } from '@mui/icons-material'
import { url } from '../apis/api'
import { StarredMsg_Sent, UnStarredMsg_Sent } from '../redux/actions';

export default function SentComp() {
    const token = jwt_decode(window.localStorage.getItem('token'));
    const data = useSelector(state => state.reducer.user.sentMail)
    const global_checkbox = useSelector(state => state.reducer.allInboxMsgsChecked)
    const [sentMail, setSentMail] = useState(data)
    const [checked, setChecked] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log("in useeffect")
        if (global_checkbox === false) {

            let dummyCheck = []
            // let dummyStarcheck = []
            if (sentMail.length !== checked.length) {

                sentMail.forEach(e => {
                    dummyCheck.push({ _id: e._id, checked: false })
                    // dummyStarcheck.push({ _id: e._id, color: "#000000ba",icon : <StarOutline/> })
                });
            }
            setChecked([...dummyCheck])
            dispatch({ type: ActionTypes.SENTCHECKLIST, payload: dummyCheck })
        }
        checked.length > 0 ? handleAllCheck() : <></>

    }, [global_checkbox, dispatch])

    const handleCheck = (_id) => {
        if (global_checkbox === true) {

            let dummyState = [...checked]
            dummyState.filter((e) => e._id === _id).map((e) => e.checked = !e.checked)
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.SENTCHECKLIST, payload: dummyState })

        }
        else {
            let dummyState = [...checked]
            // console.log(_id)
            dummyState.filter((e) => e._id === _id).map((e) => e.checked = !e.checked)
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.SENTCHECKLIST, payload: dummyState })

            // console.log(dummyState.filter((e) => e._id == _id), res, checked)

        }
    }
    const CardClick = async (e) => {
        try {
            let response = await axios.get(`${url}/sent/modify/${e._id}`)
            if (response.sentMail) {
                setSentMail([...response.data.sentMail])
            }
        }
        catch (err) {
            console.log(err)
        }
        dispatch({ type: ActionTypes.SENTCOMP_DISPLAY })
        dispatch({ type: ActionTypes.MSG_DETAILS, payload: e })
        dispatch({ type: ActionTypes.MSG_DETAILSCOMP_DISPLAY, payload: "" })
    }

    const handleAllCheck = () => {
        if (global_checkbox === true) {
            // console.log(checked)
            let dummyState = [...checked]
            dummyState.map(e => e.checked = true);
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.SENTCHECKLIST, payload: dummyState })

        }
        else if (global_checkbox === false) {
            let dummyState = [...checked]
            dummyState.map(e => e.checked = false);
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.SENTCHECKLIST, payload: dummyState })

        }
        else if (global_checkbox === "yes") {
            handleReadCheck()
        }
        else if (global_checkbox === "no") {
            handleUnreadCheck()
        }

    }

    const handleReadCheck = () => {
        // console.log("in read check::")
        sentMail.map((e) => {
            if (e.read === "yes") {
                handleCheck(e._id)
            }
            return e
        })
    }

    const handleUnreadCheck = () => {
        // console.log("in unread check::")
        sentMail.map((e) => {
            if (e.read === "no") {
                handleCheck(e._id)
            }
            return e
        })
    }

    const StarredMsgs = (e) => {
        if (e.starred) {
            dispatch(UnStarredMsg_Sent(token.user._id, e._id))
        }
        else {
            dispatch(StarredMsg_Sent(token.user._id, e._id))
        }
    }


    return (
        <>
            <Box sx={{ width: '100%' }}>
                <>
                    {sentMail.length > 0 ?
                        <Table>
                            <TableBody>
                                {sentMail?.map((e, i) => {
                                    return <TableRow key={e._id}
                                        sx={[
                                            e.read === "yes" ?
                                                { color: "#9e9e9e" }
                                                :
                                                { color: "#212121" },
                                            {
                                                "&:hover": {
                                                    boxShadow: "2px 2px 2px #9e9e9e",
                                                    border: "0.5px solid grey",
                                                },
                                                ".MuiTableCell-root": {

                                                    borderBottom: "0px",
                                                    borderRadius: "0px",
                                                    p: "0rem",
                                                    "&:last-child": { p: "0rem", height: "3rem" }
                                                },
                                                height: "3rem",

                                            }


                                        ]}
                                    >
                                        <TableCell sx={{ display: "flex", alignItems: "center" }}>
                                            <Checkbox checked={checked.length > 0 && checked[i].checked ? true : false} onClick={() => handleCheck(e._id)}></Checkbox>
                                            <Checkbox checked={e.starred ? true : false} icon={<StarOutline />} checkedIcon={<Star />} onClick={() => StarredMsgs(e)} ></Checkbox>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.to}</Typography>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.subject}</Typography>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            {e.date === new Date().toUTCString().split(" ").filter((e, i) => i === 1 || i === 2).join(" ") ? <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>
                                                {
                                                {
                                                new Date(e.Time).toLocaleTimeString().split("").length === 11?
                                                    new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 5 && i != 6 && i !== 7)
                                                :
                                                 new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 4 && i != 5 && i !== 6)
}
                                            }</Typography> : <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.date}</Typography>}
                                        </TableCell>
                                    </TableRow >
                                })}
                            </TableBody>
                        </Table>
                        :
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                mt: "2.5rem"
                            }}
                        >
                            <Avatar sx={{ width: "60px", height: "60px" }}>
                                <InfoOutlined sx={{ width: "5rem", height: "5rem", color: "#1565c0", backgroundColor: "white" }} />
                            </Avatar>
                            <Typography
                                variant="h6"
                                sx={{ textAlign: "center", fontWeight: "bold", color: "black" }}>
                                Empty ! Send Some Messages
                            </Typography>
                        </Box>
                    }
                </>
            </Box>
        </>
    );
}


