import { Box, List, ListItemText, ListItem, ListItemButton, ListItemIcon, Avatar } from "@mui/material";
import { Delete, MoveToInbox, Send, Star, InsertDriveFile } from "@mui/icons-material"

import { useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../constants/constants";

import '../App.css'

export default function Sidebar() {
    const dispatch = useDispatch()
    const sidebarOpen = useSelector(state => state.reducer.sidebarOpen)
    const inboxOpen = useSelector(state => state.reducer.inboxOpen)
    const sentCompOpen = useSelector(state => state.reducer.sentCompOpen)
    const draftCompOpen = useSelector(state => state.reducer.draftCompOpen)
    const binCompOpen = useSelector(state => state.reducer.binCompOpen)
    const starredCompOpen = useSelector(state => state.reducer.starredCompOpen)
    const currentCompOpen = useSelector(state => state.reducer.currentOpenComp)
    const [inbox_opened, setInbox_opened] = useState(true)
    const buttons = [
        {
            name: "Inbox",
            Icon: <MoveToInbox />
        },
        {
            name: "Sent",
            Icon: <Send />,
        },
        {
            name: "Draft",
            Icon: <InsertDriveFile />,
        },
        {
            name: "Starred",
            Icon: <Star />
        },
        {
            name: "Bin",
            Icon: <Delete />
        }

    ]
    let styles = {
        overflow: "hidden",
        width: "4.3rem",
        boxShadow: "0 0 2px whitesmoke",
        minHeight: "35rem",
        height: "100%",
        mt: "5px",
        pb: "0px",
        pt: "5px",

    }
    let stylesOnchange = {
        ...styles,
        width: "12rem",
        transition: "0.5s"
    }

    let red_color = { color: "red", }


    const handleComp = (e) => {
        if (e.name === "Inbox") {
            if (inboxOpen !== true) {
                setInbox_opened(true)
                dispatch({ type: ActionTypes[currentCompOpen], payload: "" })
                dispatch({ type: ActionTypes.INBOX_DISPLAY, payload: "" })
            }
        }
        else if (e.name === "Sent") {
            if (sentCompOpen !== true) {
                setInbox_opened(false)

                dispatch({ type: ActionTypes[currentCompOpen], payload: "" })
                dispatch({ type: ActionTypes.SENTCOMP_DISPLAY, payload: "" })
            }
        }
        else if (e.name === "Draft") {
            if (draftCompOpen !== true) {
                setInbox_opened(false)

                dispatch({ type: ActionTypes[currentCompOpen], payload: "" })
                dispatch({ type: ActionTypes.DRAFTCOMP_DISPLAY, payload: "" })
            }
        }
        else if (e.name === "Bin") {
            if (binCompOpen !== true) {
                setInbox_opened(false)

                dispatch({ type: ActionTypes[currentCompOpen], payload: "" })
                dispatch({ type: ActionTypes.BINCOMP_DISPLAY, payload: "" })
            }
        }
        else if (e.name === "Starred") {
            if (starredCompOpen !== true) {
                setInbox_opened(false)

                dispatch({ type: ActionTypes[currentCompOpen], payload: "" })
                dispatch({ type: ActionTypes.STARREDCOMP_DISPLAY, payload: "" })
            }
        }
    }

    const handleComposeWindow = () => {
        dispatch({ type: ActionTypes.COMPOSE_DISPLAYOPEN })
    }

    return (
        <>
            <Box >
                <List elevation={4} sx={sidebarOpen ? stylesOnchange : styles} >
                    {sidebarOpen ? 
                    <>
                        <ListItemButton
                            sx={{
                                position: "relative",
                                left: "2px",
                                borderRadius: "3rem",
                                mr: "1rem",
                                boxShadow: "2px 2px 5px #a9a7a7",
                            }}
                            onClick={() => handleComposeWindow()}
                        >
                            <ListItemIcon sx={{ minWidth: "55px" }}>
                                <Avatar
                                    sx={{ p: "5px", width: "60%", height: "60%" }}
                                    alt="image"
                                    src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png"
                                />
                            </ListItemIcon>
                            <ListItemText>Compose</ListItemText>
                        </ListItemButton>
                        {buttons?.map((e, i) => {
                            return <ListItem key={i}>
                                <ListItemButton
                                    sx={[
                                        {
                                            position: "relative", left: "-6px",
                                            "&:hover": { borderRadius: "30px", backgroundColor: "#9898986e" },
                                            py: "8px", pl: "18px",
                                        },
                                        {
                                            backgroundColor: inbox_opened === true && e.name === "Inbox" ? "#fce8e6" : "white",
                                            borderRadius: inbox_opened === true && e.name === "Inbox" ? "30px" : "0px"
                                        }
                                    
                                    ]}
                                    onClick={() => handleComp(e)}
                                >
                                    <ListItemIcon sx={{minWidth: "55px" ,
                                        color: inbox_opened === true && e.name === "Inbox" ? "red" : "" ,
                                        }} >
                                        {e.Icon}
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: inbox_opened === true && e.name === "Inbox" ? "red" : ""}}
                                    >{e.name}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        })}
                    </>
                        :
                        <Box>

                            <ListItemButton sx={{ position: "relative", left: "2px", }} onClick={() => handleComposeWindow()}>
                                <ListItemIcon sx={{ minWidth: "55px" }}>
                                    <Avatar
                                        variant="circular"
                                        sx={{ p: "5px", boxShadow: "2px 2px 5px", width: "60%", height: "60%" }}
                                        alt="image"
                                        src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png"
                                    /></ListItemIcon>
                                {/* <ListItemText>Compose</ListItemText> */}
                            </ListItemButton>
                            {buttons?.map((e, i) => {
                                return <ListItem key={i} sx={{ gap: "1rem" }}>
                                    <ListItemButton
                                        sx={[{position: "relative", left: "-6px"}]}
                                        onClick={() => handleComp(e)}>
                                        <ListItemIcon
                                            sx={[inbox_opened === true && e.name === "Inbox" ? red_color : ""]}
                                        >
                                            {e.Icon}
                                        </ListItemIcon>
                                        <ListItemIcon>
                                            {e.name}
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            })}

                        </Box>
                    }


                </List>
            </Box>
        </>
    );
}
