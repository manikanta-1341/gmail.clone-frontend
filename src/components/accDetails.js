import { Box, Typography, Avatar, Card, CardContent, Button, Divider } from '@mui/material'
import { AccountCircle, CameraAlt } from '@mui/icons-material';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function AccDetails() {
    const user_data = jwt_decode(window.localStorage.getItem('token'))
    const nav = useNavigate()
    const [file,setFile] = useState('')
    const Signout = () => {
        window.localStorage.removeItem('token')
        nav('/')
    }
    const handleFile=(e)=>{
        try{
            setFile(e.target.value)
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <>
            <Box sx={[{ position: "fixed", right: 40, top: 60, minWidth: "25rem", overflow: "auto", height: "100%" }]}>
                <Card elevation={3}>
                    <CardContent
                        sx={{ p: "0px", display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <Avatar  sx={{ height:"6rem",width:"6rem", position: "relative" }} />
                        <Button
                            sx={{position: "absolute", top: "3.3rem", right: "8.5rem"}}
                            component="label"    
                        >
                            <Avatar sx={{bgcolor:"white",'&:hover': {
                                    bgcolor: "white"
                                }}}><CameraAlt id="button-file" sx={{ color: "black" }} /></Avatar>
                            <input type="file" accept='.jpg,.jpeg,.png' onChange={(e)=>handleFile(e)} hidden/>
                        </Button>
                        <Typography sx={{ fontWeight: "700", pb: "0.5rem" }}>{
                            user_data.user.firstname.split("").map((e, i) => {
                                if (i == 0) { e = e.toUpperCase() }
                                return e
                            }).join("")
                            +
                            user_data.user.lastname.split("").map((e, i) => {
                                if (i == 0) { e = e.toUpperCase() }
                                return e
                            }).join("")
                        }</Typography>
                        <Typography sx={{ fontWeight: "700", pb: "1.3rem" }}>{user_data.user.username}</Typography>
                        <Divider sx={{ width: "100%", my: "1rem" }} />
                        <Button variant="outlined" sx={{ borderRadius: "1.5rem", borderColor: "#81858980", color: "black", fontweight: "500",'&:hover': {
                                    borderColor: "#81858980"
                                } }}>
                            <Typography>Mangae Your Google Account</Typography>
                        </Button>
                        <Divider sx={{ width: "100%", my: "1rem" }} />
                        <Button sx={{ fontWeight: "400", color: "black", fontweight: "500" }}>Add another account</Button>
                        <Divider sx={{ width: "100%", my: "1rem" }} />
                        <Button
                            variant="outlined"
                            sx={{ fontWeight: "400", color: "black", borderColor: "#81858980", fontweight: "500",'&:hover': {
                                borderColor: "#81858980"
                            } }}
                            onClick={() => Signout()}
                        >
                            Sign out
                        </Button>
                        <Divider sx={{ width: "100%", my: "1rem" }} />
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}