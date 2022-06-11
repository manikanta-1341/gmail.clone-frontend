import React from 'react'
import { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import { Card, CardContent, CardActions, Avatar, Checkbox, Grid, Typography, Table, TableBody, TableRow, TableCell, Box, Button } from "@mui/material";
import { StarOutline, Star, InfoOutlined } from '@mui/icons-material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import MsgDetails from './msgdetails'
import { url } from "../apis/api"
import { useDispatch, useSelector, } from 'react-redux';
import { ActionTypes } from '../constants/constants';
import { StarredMsg, UnStarredMsg } from '../redux/actions';
export default function InboxCheck() {
    const tokencheck = useState(window.localStorage.getItem('token'))
    const nav = useNavigate()
    if (tokencheck) {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }
    return (
        window.localStorage.getItem('token') ? <>

            <InboxComp />
        </>
            :
            <>
                <Card sx={{ width: '100%', maxWidth: "40%", mx: "auto", mt: "12%", p: "2%", backgroundColor: "#e9e9e9" }} variant="outlined">
                    <CardContent>
                        <Typography sx={{ textAlign: "center" }} variant="h5" color="dark">Please Login To Access The Content</Typography>
                    </CardContent>
                    <CardActions>
                        <Button sx={{ mx: "auto", fontSize: "1.5rem" }} onClick={() => nav('/')}>Login</Button>
                    </CardActions>
                </Card>
            </>
    );
}

function InboxComp() {

    const token = jwt_decode(window.localStorage.getItem('token'))
    const dispatch = useDispatch()



    const global_checkbox = useSelector(state => state.reducer.allInboxMsgsChecked)

    const inboxOpen = useSelector(state => state.reducer.inboxOpen)
    const [inbox, setInbox] = useState([])
    const [checked, setChecked] = useState([])
    const [styles, setStyles] = useState({
        fontSize: "0.875rem",
        fontWeight: "700",
        color: "text.secondary",
        width: "200px",
        textAlign: "left",
        justifyContent: "flex-start"
    })
    const [style_primary, setStyle_Primary] = useState({

        color: "red",
        border: "none",
        borderBottom: "2px solid red",
        borderRadius: "0px"

    })

    useEffect(() => {
        let apiCall = async () => {

            dispatch({ type: ActionTypes.SET_TOKEN, payload: window.localStorage.getItem('token') })
            // dispatch(ApiCall_msgs(token.user._id))
            // console.log(user_data.inbox)
            // setInbox({...user_data.inbox})
            // let dummyState = [...inbox]
            let response = await axios.get(`${url}/inbox/${token.user._id}`)
            let dummyState = [...response.data.inbox]
            await setInbox([...dummyState])
            dispatch({ type: ActionTypes.FETCH_MAILS, payload: response.data })
            if (global_checkbox === false) {

                let dummyCheck = []
                if (dummyState.length !== checked.length)
                    dummyState.forEach(e => {
                        dummyCheck.push({ _id: e._id, checked: false })
                    });
                await setChecked([...dummyCheck])
            }
            checked.length > 0 ? handleAllCheck() : <></>

        }
        apiCall()

    }, [global_checkbox, inboxOpen, dispatch])



    const handleCheck = (_id) => {
        if (global_checkbox === true) {

            let dummyState = [...checked]
            dummyState.filter((e) => e._id === _id).map((e) => e.checked = !e.checked)
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.CHECKLIST, payload: dummyState })

        }
        else {
            let dummyState = [...checked]
            // console.log(_id)
            dummyState.filter((e) => e._id === _id).map((e) => e.checked = !e.checked)
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.CHECKLIST, payload: dummyState })

            // console.log(dummyState.filter((e) => e._id == _id), res, checked)

        }
    }


    const CardClick = async (e) => {
        // console.log(checked)
        try {
            let response = await axios.get(`${url}/inbox/modify/${e._id}`)
            if (response.inbox) {
                setInbox([...response.data.inbox])
            }
        }
        catch (err) {
            console.log(err)
        }
        dispatch({ type: ActionTypes.INBOX_DISPLAY })
        dispatch({ type: ActionTypes.MSG_DETAILS, payload: e })
        dispatch({ type: ActionTypes.MSG_DETAILSCOMP_DISPLAY, payload: "" })
    }

    const handleClick = (e) => {

        switch (e.target.innerText.toLowerCase()) {
            case "primary": {

                setStyles({
                    ...styles, "&:focus": {
                        color: "red",
                        border: "none",
                        borderBottom: "2px solid red",
                        borderRadius: "0px"
                    }
                })

                break;
            }
            case "social": {
                setStyle_Primary({})
                setStyles({
                    ...styles, "&:focus": {
                        color: "red",
                        border: "none",
                        borderBottom: "2px solid red",
                        borderRadius: "0px"
                    }
                })
                break;
            }
            case "promotions": {
                setStyle_Primary({})
                setStyles({
                    ...styles, "&:focus": {
                        color: "red",
                        border: "none",
                        borderBottom: "2px solid red",
                        borderRadius: "0px"
                    }
                })
                break;
            }
            default: {
                break;
            }
        }
    }

    const handleAllCheck = () => {
        if (global_checkbox === true) {

            let dummyState = [...checked]
            dummyState.map(e => e.checked = true);
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.CHECKLIST, payload: dummyState })

        }
        else if (global_checkbox === false) {
            let dummyState = [...checked]
            dummyState.map(e => e.checked = false);
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.CHECKLIST, payload: dummyState })

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
        inbox.map((e) => {
            if (e.read === "yes") {
                handleCheck(e._id)
            }
            return e
        })
    }

    const handleUnreadCheck = () => {
        // console.log("in unread check::")
        inbox.map((e) => {
            if (e.read === "no") {
                handleCheck(e._id)
            }
            return e
        })
    }

    const StarredMsgs = (e) => {
        if (e.starred) {
            dispatch(UnStarredMsg(token.user._id, e._id))
        }
        else {
            dispatch(StarredMsg(token.user._id, e._id))
        }
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <>

                    <Grid container
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"

                        sx={{ pl: "1rem", pt: "1rem" }}
                    >

                        {
                            ["Primary", "Social", "Promotions"].map((e, i) => {


                                return <Grid item key={i}>
                                    <Button sx={[styles, e === "Primary" ? style_primary : {}]}
                                        onClick={(e) => handleClick(e)}>{e}</Button>
                                </Grid>


                            })
                        }

                    </Grid>
                    {inbox.length > 0 ?
                        <Table>
                            <TableBody>
                                {inbox?.map((e, i) => {
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
                                            <Checkbox checked={e.starred === "yes" ? true : false} icon={<StarOutline />} checkedIcon={<Star />} onClick={() => StarredMsgs(e)}></Checkbox>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.from}</Typography>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.subject}</Typography>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            {e.date === new Date().toUTCString().split(" ").filter((e, i) => i === 1 || i === 2).join(" ") ? <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>
                                                {
                                                new Date(e.Time).toLocaleTimeString().split("").length === 11?
                                                    new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 5 && i != 6 && i !== 7)
                                                :
                                                 new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 4 && i != 5 && i !== 6)
}
                                                    </Typography> : <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.date}</Typography>}
                                        </TableCell>
                                    </TableRow >
                                })}
                            </TableBody>
                        </Table>
                        :
                        <Box
                            sx={{
                                display:"flex",
                                flexDirection:"column",
                                alignItems:"center",
                                mt:"2.5rem"
                            }}
                        >
                            <Avatar sx={{width:"60px",height:"60px"}}>
                            <InfoOutlined sx={{width:"5rem",height:"5rem",color:"red",backgroundColor:"white"}}/>
                            </Avatar>
                            <Typography
                                variant="h6"
                                sx={{  textAlign: "center", fontWeight: "bold", color: "#ef5748" }}>
                                ...Inbox Empty
                            </Typography>
                        </Box>
                    }
                </>
            </Box>
        </>
    );
}
