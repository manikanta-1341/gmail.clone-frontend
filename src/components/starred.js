import { Box, Typography, Table, TableBody, TableRow, TableCell, Checkbox, Avatar } from "@mui/material";
import { Star, StarOutline , InfoOutlined} from "@mui/icons-material";
import { url } from '../apis/api'
import jwt_decode from 'jwt-decode'
import { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../constants/constants';
import { UnStarredMsg } from '../redux/actions';

export default function StarredComp() {
    const dispatch = useDispatch()
    const token = jwt_decode(window.localStorage.getItem('token'))
    const data = useSelector(state => state.reducer.user.starred)
    const [starred_data, setStarred_data] = useState(data)
    const [checked, setChecked] = useState([])
    const global_checkbox = useSelector(state => state.reducer.allInboxMsgsChecked)
    useEffect(() => {

        let dummyCheck = []
        if (starred_data.length !== checked.length)
            starred_data.forEach(e => {
                dummyCheck.push({ _id: e._id, checked: false })
            });
        setChecked([...dummyCheck])
        dispatch({ type: ActionTypes.STARREDCHECKLIST, payload: dummyCheck })
        checked.length > 0 ? handleAllCheck() : <></>

    }, [data, global_checkbox, dispatch])


    const handleCheck = (_id) => {
        // console.log("in check")
        if (global_checkbox === true) {

            let dummyState = [...checked]
            dummyState.filter((e) => e._id === _id).map((e) => e.checked = !e.checked)
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.STARREDCHECKLIST, payload: dummyState })


        }
        else {
            let dummyState = [...checked]
            // console.log(_id)
            dummyState.filter((e) => e._id === _id).map((e) => e.checked = !e.checked)
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.STARREDCHECKLIST, payload: dummyState })

            // console.log(dummyState.filter((e) => e._id == _id), res, checked)

        }
    }


    const CardClick = async (e) => {
        try {
            let response = await axios.get(`${url}/starred/modify/${e._id}`)
            if (response.starred) {
                setStarred_data([...response.data.starred])
            }
        }
        catch (err) {
            console.log(err)
        }
        dispatch({ type: ActionTypes.STARREDCOMP_DISPLAY })
        dispatch({ type: ActionTypes.MSG_DETAILS, payload: e })
        dispatch({ type: ActionTypes.MSG_DETAILSCOMP_DISPLAY, payload: "" })
    }

    const handleAllCheck = () => {
        // console.log("in all check")
        if (global_checkbox === true) {

            let dummyState = [...checked]
            dummyState.map(e => e.checked = true);
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.STARREDCHECKLIST, payload: dummyState })

        }
        else if (global_checkbox === false) {
            let dummyState = [...checked]
            dummyState.map(e => e.checked = false);
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.STARREDCHECKLIST, payload: dummyState })

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
        starred_data.map((e) => {
            if (e.read === "yes") {
                handleCheck(e._id)
            }
            return e
        })
    }

    const handleUnreadCheck = () => {
        // console.log("in unread check::")
        starred_data.map((e) => {
            if (e.read === "no") {
                return handleCheck(e._id)

            }
            return e
        })
    }

    const StarredMsgs = (e) => {
        dispatch(UnStarredMsg(token.user._id, e._id))
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>


                <>
                    {starred_data.length > 0 ?
                        <Table>
                            <TableBody>
                                {starred_data?.map((e, i) => {
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
                                            <Checkbox checked={true} icon={<StarOutline />} checkedIcon={<Star />} onClick={() => StarredMsgs(e)} ></Checkbox>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.from}</Typography>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.subject}</Typography>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            {e.date === new Date().toUTCString().split(" ").filter((e, i) => i === 1 || i === 2).join(" ") ? <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.Time}</Typography> : <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.date}</Typography>}
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
                                <InfoOutlined sx={{ width: "5rem", height: "5rem", color: "text.secondary", backgroundColor: "white" }} />
                            </Avatar>
                            <Typography
                                variant="h6"
                                sx={{ textAlign: "center", fontWeight: "bold", color: "black" }}>
                                No Messages Starred yet.
                            </Typography>
                        </Box>
                    }
                </>

            </Box>
        </>
    );

}