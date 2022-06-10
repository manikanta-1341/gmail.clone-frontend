import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box,Avatar,Typography, TextField, Button } from '@mui/material';
import { url } from '../apis/api'





export default  function Passwordreset() {
    const [email, setEmail] = React.useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${url}/forgetpassword`, {
                email: email
            })
            if (response.status === 200) {
                // console.log("in pr res::", response)
                alert("Reset link sent to registerd Email")
            }
        }
        catch (err) {
            alert('Email Not Registered')
        }
    }
    return (
        <>
            <Box style={{ marginTop:"120px",width:"100%", textAlign:"center" }}>
                <Avatar
                alt="google-icon"
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                sx={{m:1,width:60,height:60,mr:"auto",ml:"auto"}}
                ></Avatar>
                <Typography variant="h4" component="div"> Password Reset  </Typography> <br /> 
                <form onSubmit={handleSubmit}>
                    <Box sx={{width:"100%"}}>
                        <TextField type="email" name="Email" label="Email"
                            value={email}
                            sx={{width:"30%"}}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Box> <br />
                    <Button variant="contained" type="submit" sx={{width:"30%"}} > Submit </Button>
                </form>
            </Box>
        </>
    );
}