import { Box, Typography, Grid, Avatar,Table, TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import { Delete , InfoOutlined } from "@mui/icons-material";
import { url } from '../apis/api'
import jwt_decode from 'jwt-decode'
import { useState, useEffect } from "react";

import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { ActionTypes } from '../constants/constants';

export default function BinComp() {
    const dispatch = useDispatch()
    const token = jwt_decode(window.localStorage.getItem('token'))
    const [bin_data, setBin_data] = useState([])

    const [checked, setChecked] = useState([])
    const global_checkbox = useSelector(state => state.reducer.allInboxMsgsChecked)
    useEffect(() => {
        let apiCall = async () => {
            let response = await axios.get(`${url}/inbox/${token.user._id}`)
            //console.log(response.data.bin)
            let dummyState = [...response.data.bin]
            await setBin_data([...dummyState])
            let dummyCheck = []
            if (dummyState.length !== checked.length)
                dummyState.forEach(e => {
                    dummyCheck.push({ _id: e._id, checked: false })
                });
            await setChecked([...dummyCheck])
            dispatch({ type: ActionTypes.BINCHECKLIST, payload: dummyCheck })
            checked.length > 0 ? handleAllCheck() : <></>
        }
        apiCall()
    }, [global_checkbox])


    const handleCheck = (_id) => {
        //console.log("in check")
        if (global_checkbox === true) {

            let dummyState = [...checked]
            dummyState.filter((e) => e._id === _id).map((e) => e.checked = !e.checked)
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.BINCHECKLIST, payload: dummyState })


        }
        else {
            let dummyState = [...checked]
            // console.log(_id)
            dummyState.filter((e) => e._id === _id).map((e) => e.checked = !e.checked)
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.BINCHECKLIST, payload: dummyState })

            // console.log(dummyState.filter((e) => e._id == _id), res, checked)

        }
    }


    const CardClick = async (e) => {
        dispatch({ type: ActionTypes.BINCOMP_DISPLAY })
        dispatch({ type: ActionTypes.MSG_DETAILS, payload: e })
        dispatch({ type: ActionTypes.MSG_DETAILSCOMP_DISPLAY, payload: "" })
    }

    const handleAllCheck = () => {
        //console.log("in all check",checked)
        if (global_checkbox === true) {

            let dummyState = [...checked]
            dummyState.map(e => e.checked = true);
            setChecked([...dummyState])
            //console.log("in all check",dummyState)
            dispatch({ type: ActionTypes.BINCHECKLIST, payload: dummyState })

        }
        else if (global_checkbox === false) {
            let dummyState = [...checked]
            dummyState.map(e => e.checked = false);
            setChecked([...dummyState])
            dispatch({ type: ActionTypes.BINCHECKLIST, payload: dummyState })

        }
    }



    return (
        <>
            <Box sx={{ width: '100%' }}>

                <>
                    {bin_data.length>0 ?
                        <Table>
                            <TableBody>
                                {bin_data?.map((e, i) => {
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
                                                height: "3rem"
                                            }


                                        ]}
                                    >
                                        <TableCell >
                                            <Checkbox checked={checked.length > 0 && checked[i].checked ? true : false} onClick={() => handleCheck(e._id)}></Checkbox>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            <Grid
                                                display="flex"
                                                alignItems="center"
                                            >
                                                {e.from ? <Typography component="span"
                                                    sx={{ backgroundColor: "#0000006b", py: "2px", px: "4px", textalign: "center", borderRadius: "5px" }}
                                                >Inbox</Typography> : <></>}
                                                <Typography sx={[{ display: "flex", alignItems: "center" }, e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}><Delete sx={{ color: "text.secondary" }} />{e.from ? e.from : token.user.username}</Typography>
                                            </Grid>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
                                            <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.subject}</Typography>
                                        </TableCell>
                                        <TableCell onClick={() => CardClick(e)}>
<<<<<<< HEAD
                                            {e.date === new Date().toUTCString().split(" ").filter((e, i) => i === 1 || i === 2).join(" ") ? <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{
=======
                                            {e.date === new Date().toUTCString().split(" ").filter((e, i) => i === 1 || i === 2).join(" ") ? <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>
                                                {
                                                {
>>>>>>> cc1c146c524cdfe82b81765bd90fdd65674ae9e3
                                                new Date(e.Time).toLocaleTimeString().split("").length === 11?
                                                    new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 5 && i != 6 && i !== 7)
                                                :
                                                 new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 4 && i != 5 && i !== 6)
<<<<<<< HEAD
}</Typography> : <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.date}</Typography>}
=======
}
                                            }
</Typography> : <Typography sx={[e.read === "no" ? { fontWeight: "bold" } : { fontWeight: 200 }, { cursor: "context-menu" },]}>{e.date}</Typography>}
>>>>>>> cc1c146c524cdfe82b81765bd90fdd65674ae9e3
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
                                Empty
                            </Typography>
                        </Box>
                    }
                </>

            </Box>
        </>
    );

}
