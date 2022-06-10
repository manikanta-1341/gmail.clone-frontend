import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {useNavigate} from 'react-router-dom';

export default function ActivationCard() {
    const nav = useNavigate()
    return (
        <Card sx={{ maxWidth : "40rem", margin : "auto",mt : 20 ,display : "flex", flexDirection:"column",alignItems: "center" }}>
            <CardContent sx={{display : "flex", flexDirection:"column",alignItems: "center"}}>
                <CheckCircleOutlineOutlinedIcon  color = "success" sx={{fontSize:48 , textalign:"center"}} />
                <Typography sx={{mt : 1.5 }} variant="h4" color="text.dark" gutterBottom>
                    Account Activated
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="large" onClick={() => nav('/')}>Login</Button>
            </CardActions>
        </Card>
    );
}