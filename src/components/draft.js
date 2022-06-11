import React from 'react'
import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Checkbox, Avatar, Typography, Table, TableBody, TableRow, TableCell, Box, Button } from "@mui/material";
import { InfoOutlined} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { ActionTypes } from '../constants/constants';
export default function DraftCheck() {
    const tokencheck = window.localStorage.getItem('token')
    const nav = useNavigate()
    if (tokencheck) {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }
    return (
        tokencheck ? <>

            <DraftComp />
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

function DraftComp() {
    const dispatch = useDispatch()
    const user_data = useSelector(state => state.reducer.user)
    const global_checkbox = useSelector(state => state.reducer.allInboxMsgsChecked)
    const draftOpen = useSelector(state => state.reducer.draftCompOpen)
    const [draft, setDraft] = useState([])
    const [checked, setChecked] = useState([])

    useEffect(() => {
        let dummyState = [...user_data.draft]
        setDraft([...dummyState])
        if (global_checkbox === false) {
            let dummyCheck = []
            if (dummyState.length !== checked.length)
                dummyState.forEach(e => {
                    dummyCheck.push({ _id: e._id, checked: false })
                });
            setChecked([...dummyCheck])
        }
        checked.length > 0 ? handleAllCheck() : <></>

    }, [global_checkbox, draftOpen])



    const handleCheck = (_id) => {
        if (global_checkbox === true) {

            let dummyState = [...checked]
             dummyState.filter((e) => e._id === _id).map((e) => e.checked = !e.checked)
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.DRAFTCHECKLIST, payload: dummyState })

        }
        else {
            let dummyState = [...checked]
            // console.log(_id)
             dummyState.filter((e) => e._id === _id).map((e) => e.checked = !e.checked)
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.DRAFTCHECKLIST, payload: dummyState })



        }
    }


    const CardClick = async (e) => {
        dispatch({ type: ActionTypes.DRAFTMSG, payload: e })
        dispatch({ type: ActionTypes.COMPOSE_DISPLAYOPEN })

    }


    const handleAllCheck = () => {
        if (global_checkbox === true) {

            let dummyState = [...checked]
            dummyState.map(e => e.checked = true);
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.DRAFTCHECKLIST, payload: dummyState })

        }
        else if (global_checkbox === false) {
            let dummyState = [...checked]
            dummyState.map(e => e.checked = false);
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.DRAFTCHECKLIST, payload: dummyState })

        }

    }


    return (
        <>
            <Box sx={{ width: '100%' }}>
                <>
                    {draft.length > 0 ?
                        <Table>
                            <TableBody>
                                {draft?.map((e, i) => {
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

                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.to}</Typography>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            <Typography sx={[e.read ==="no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.subject ? e.subject : "No Subject"}</Typography>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            {e.date === new Date().toUTCString().split(" ").filter((e, i) => i === 1 || i === 2).join(" ") ? <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{
                                                new Date(e.Time).toLocaleTimeString().split("").length === 11?
                                                    new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 5 && i != 6 && i !== 7)
                                                :
                                                 new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 4 && i != 5 && i !== 6)
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
                                <InfoOutlined sx={{ width: "5rem", height: "5rem", color: "red", backgroundColor: "white" }} />
                            </Avatar>
                            <Typography
                                variant="h6"
                                sx={{ textAlign: "center", fontWeight: "bold", color: "#ef5748" }}>
                                Empty
                            </Typography>
                        </Box>
                    }
                </>
            </Box>
        </>
    );
}