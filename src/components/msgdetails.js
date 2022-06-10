import { Button,Box, Card, CardHeader, CardContent,CardActions, Typography, Table, TableRow, TableCell, TableBody} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
export default function MsgDetailsCheck() {
    const [tokencheck] = useState(window.localStorage.getItem('token'))
    const nav = useNavigate()
    if (tokencheck) {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }
    return (
        tokencheck ? <>
            <MsgDetails />
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




function MsgDetails() {
    const token = jwt_decode(window.localStorage.getItem('token'))
    const msg_details = useSelector(state=>state.reducer.OpenMsgDetails)
    const sentComp = useSelector(state=>state.reducer.sentCompOpen)

    return (
        <>
            <Box sx={{mx:"5%", mt: "2%" }}>
                <Card variant="outlined">
                    <CardHeader
                        title={msg_details.subject}
                    />
                    <CardContent>
                    <Table>
                        <TableBody >
                            <TableRow>
                                <TableCell sx={{p:"5px",border:"none"}}>
                                        <Typography>From : {msg_details.from?msg_details.from:token.user.username}</Typography>
                                        {/* <Typography> To : {props.from.username}</Typography> */}
                                </TableCell>
                                <TableCell sx={{p:"5px",border:"none"}}>
                                    <Typography>{msg_details.Time}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{p:"5px",border:"none"}}>
                                    <Typography sx={{fontSize:"0.8rem" ,color:"text.secondary"}}> To : {msg_details.to?msg_details.to:token.user.username}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{p:"5px",border:"none",pt:"1rem"}}>
                                    <Typography sx={{fontSize:"1rem"}}>{msg_details.msg}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}