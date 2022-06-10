import { Box, Checkbox, Select, MenuItem, Button } from "@mui/material";
import { Refresh, Delete, MoreVert } from '@mui/icons-material'
import "../App.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from '../constants/constants'
import { MarkallRead, MarkallunRead, DeleteMsgsInbox, DeleteMsgsSent, DeleteMsgsStarred, PermanentDelete, RestoreAll, DeleteMsgsDraft } from '../redux/actions'
import jwt_decode from 'jwt-decode'
export default function ManupulationBar() {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const token = jwt_decode(window.localStorage.getItem('token'))
    const checked = useSelector(state => state.reducer.allInboxMsgsChecked)
    const binCompOpen = useSelector(state => state.reducer.binCompOpen)
    const inboxOpen = useSelector(state => state.reducer.inboxOpen)
    const sentCompOpen = useSelector(state => state.reducer.sentCompOpen)
    const draftCompOpen = useSelector(state => state.reducer.draftCompOpen)
    const starredCompOpen = useSelector(state => state.reducer.starredCompOpen)
    const checklist = useSelector(state => state.reducer.checkList)
    const Sentboxchecklist = useSelector(state => state.reducer.SentboxcheckList)
    const Draftchecklist = useSelector(state => state.reducer.DraftcheckList)
    const Starredchecklist = useSelector(state => state.reducer.StarredcheckList)
    const Binchecklist = useSelector(state => state.reducer.BincheckList)
    const msg_details = useSelector(state => state.reducer.OpenMsgDetails)
    const msgDetailsCompOpen = useSelector(state => state.reducer.msgDetailsCompOpen)


    const handleCheck = (e) => {
        dispatch({ type: ActionTypes.INBOX_MSGS_CHECKED, payload: "" })
    }


    const handleSelect = (e) => {
        // setSelected(e.target.value)
        switch (e.target.value.toLowerCase()) {
            case "all": {
                dispatch({ type: ActionTypes.INBOX_MSGS_CHECKED, payload: e.target.value })

                break;
            }
            case "yes": {
                // console.log(e.target.value)
                let check_msgs = checklist.map((e) => e.checked = false)
                dispatch({ type: ActionTypes.CHECKLIST, payload: check_msgs })
                dispatch({ type: ActionTypes.INBOX_MSGS_CHECKED, payload: e.target.value })
                break;
            }
            case "no": {
                let check_msgs = checklist.map((e) => e.checked = false)
                dispatch({ type: ActionTypes.CHECKLIST, payload: check_msgs })
                // dispatch({type:ActionTypes.INBOX_MSGS_CHECKED,payload:"none"})
                dispatch({ type: ActionTypes.INBOX_MSGS_CHECKED, payload: e.target.value })
                // console.log(e.target.value)
                break;
            }
            case "none": {
                // console.log(e.target.value)
                dispatch({ type: ActionTypes.INBOX_MSGS_CHECKED, payload: e.target.value })
                // props.func_check(false)
                break;
            }
            default: {
                break;
            }
        }
    }

    const handleSelectMore = (e) => {
        if (e.target.value === "readAll") {
            if (inboxOpen === true) {
                dispatch(MarkallRead("inbox", token.user._id))
                nav('/inbox')
            }
            else if (sentCompOpen === true) {
                dispatch(MarkallRead("sent", token.user._id))
            }
        }
        else if (e.target.value === "unreadAll") {
            if (inboxOpen === true) {
                dispatch(MarkallunRead("inbox", token.user._id))
                nav('/dashboard')
            }
            else if (sentCompOpen === true) {
                dispatch(MarkallunRead("sent", token.user._id))
            }
        }
    }

    const handleRestoreAll = (e) => {
        // console.log(e.target.value)
        if (e.target.value === "restoreOne") {
            let res = Binchecklist.filter((e) => e.checked === true)
            if (res.length > 0) {
                // console.log(res)
                dispatch(RestoreAll(res, token.user._id))
            }
            else {
                alert("Select a Message")
            }
        }
        else if (e.target.value === "restoreAll") {
            // console.log(e.target.value)
            let obj = {
                "target": {
                    "value": "all"
                }
            }
            handleSelect(obj)
            dispatch(RestoreAll(Binchecklist, token.user._id))
        }
    }

    const Remove_msg = () => {
        // console.log(token.user._id, binCompOpen)
        if (binCompOpen === false && inboxOpen === true) {
            let deleteList = checklist.filter((e) => e.checked === true)
            dispatch(DeleteMsgsInbox(token.user._id, deleteList))
        }
        else if (binCompOpen === false && sentCompOpen === true) {
            let deleteList = Sentboxchecklist.filter((e) => e.checked === true)
            dispatch(DeleteMsgsSent(token.user._id, deleteList))
        }
        else if (binCompOpen === false && draftCompOpen === true) {
            let deleteList = Draftchecklist.filter((e) => e.checked === true)
            dispatch(DeleteMsgsDraft(token.user._id, deleteList))
        }
        else if (binCompOpen === false && starredCompOpen === true) {
            let deleteList = Starredchecklist.filter((e) => e.checked === true)
            dispatch(DeleteMsgsStarred(token.user._id, deleteList))
        }
        else if (binCompOpen === true) {
            let deleteList = Binchecklist.filter((e) => e.checked === true)
            // console.log("in delete else if",deleteList)
            dispatch(PermanentDelete(token.user._id, deleteList))
        }

    }

    const RemoveSingle_msg = () => {
        if (msg_details.from) {
            dispatch(DeleteMsgsInbox(token.user._id, [msg_details]))
        }
        if (msg_details.to) {
            dispatch(DeleteMsgsSent(token.user._id, [msg_details]))
        }
    }


    return (
        <>
            <Box sx={{ pt: "1rem", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "5px" }}>

                <>
                    <Checkbox checked={checked === true ? true : false} onChange={(e) => handleCheck(e)}></Checkbox>
                    {binCompOpen === false ? <Select
                        variant="standard"
                        value={""}
                        classes={{
                            ".css-4u4t8f-MuiInputBase-root-MuiInput-root-MuiSelect-root::before": {
                                borderBottom: "0px",
                                color: "red "
                            }
                        }}
                        onChange={(e) => handleSelect(e)}
                    >
                        <MenuItem value="none" >None</MenuItem>
                        <MenuItem value="all" >All</MenuItem>
                        <MenuItem value="yes" >Read</MenuItem>
                        <MenuItem value="no" >UnRead</MenuItem>
                    </Select>
                        : <Select
                            variant="standard"
                            value={""}
                            classes={{
                                ".css-4u4t8f-MuiInputBase-root-MuiInput-root-MuiSelect-root::before": {
                                    borderBottom: "0px",
                                    color: "red "
                                }
                            }}
                            onChange={(e) => handleSelect(e)}
                        >
                            <MenuItem value="none" >None</MenuItem>
                            <MenuItem value="all" >All</MenuItem>
                        </Select>}
                </>
                <Button onClick={() => window.location.reload()}><Refresh sx={{ color: "text.secondary" }}></Refresh></Button>
                {msgDetailsCompOpen === false ? <Button
                    onClick={() => Remove_msg()}>
                    <Delete sx={{ color: "text.secondary" }}></Delete>
                </Button>
                    : <Button
                        onClick={() => RemoveSingle_msg()}>
                        <Delete sx={{ color: "text.secondary" }}></Delete>
                    </Button>
                }
                {draftCompOpen === false ?
                    binCompOpen === false ? <Select
                        IconComponent={MoreVert}
                        variant="standard"
                        value={""}
                        onChange={(e) => handleSelectMore(e)}
                        sx={{ cursor: "pointer" }}
                    >
                        <MenuItem value="readAll" >Mark all as Read</MenuItem>
                        <MenuItem value="unreadAll" >Mark all as Unread</MenuItem>
                    </Select>
                        : <Select
                            IconComponent={MoreVert}
                            variant="standard"
                            value={""}
                            onChange={(e) => handleRestoreAll(e)}
                            sx={{ cursor: "pointer" }}
                        >
                            <MenuItem value="restoreOne" >Restore One</MenuItem>
                            <MenuItem value="restoreAll" >Restore All</MenuItem>
                        </Select>

                    : <></>}
            </Box>
        </>
    );
}