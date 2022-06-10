import '../App.css'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Grid , Button ,Card , CardContent,CardActions,Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import SendMail from './sendmail';
import { useNavigate } from "react-router-dom";
import InboxComp from './inbox'
import NavBar from './navbar'
import SideBar from './sidebar'
import SentComp from './sentbox';
import DraftComp from './draft';
import AccDetails from './accDetails';
import ManupulationBar from './manupulation'
import {useSelector} from "react-redux"
import BinComp from './bin';
import StarredComp from './starred.js';
import MsgDetails from './msgdetails';
import SearchComp from './search';
// import { Inbox } from '@mui/icons-material';

const drawerWidth = 240;

export default function DashboardCheck() {
  const [tokencheck] = React.useState(window.localStorage.getItem('token'))
  const nav = useNavigate()
  if (tokencheck) {
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function (event) {
          window.history.go(1);
      };
  }
  return (
      tokencheck ? <>
          <Dashboard />
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

function Dashboard() {
    const inboxOpen = useSelector(state => state.reducer.inboxOpen)
    const sentCompOpen = useSelector(state => state.reducer.sentCompOpen)
    const draftCompOpen = useSelector(state => state.reducer.draftCompOpen)
    const binCompOpen = useSelector(state => state.reducer.binCompOpen)
    const starredCompOpen = useSelector(state => state.reducer.starredCompOpen)
    const composeOpen = useSelector(state => state.reducer.composeOpen)
    const accDetailsOpen = useSelector(state => state.reducer.accDetailsOpen)
    const msgDetailsCompOpen = useSelector(state => state.reducer.msgDetailsCompOpen)
    const searchCompOpen = useSelector(state => state.reducer.searchCompOpen)


  return (
    <>
      <NavBar/>
      <Grid
        display="flex"
        justifycontent="space-between"
      >
        <SideBar/>
        <Grid container display="flex" flexDirection="column">
          <Grid container display="flex" flexDirection="column">
            <ManupulationBar/>
            {inboxOpen?<InboxComp />:<></>}
          </Grid>
          {sentCompOpen?<SentComp />:<></>}
          {draftCompOpen?<DraftComp />:<></>}
          {binCompOpen?<BinComp/>:<></>}
          {starredCompOpen?<StarredComp/>:<></>}
          {msgDetailsCompOpen?<MsgDetails/>:<></>}
          {searchCompOpen?<SearchComp/>:<></>}
        </Grid>
      </Grid>
      {composeOpen ? <SendMail/> : <></>}
      {accDetailsOpen ? <AccDetails/> : <></>}
    </>
  );
}