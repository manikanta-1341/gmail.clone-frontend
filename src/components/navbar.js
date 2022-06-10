import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Box, Avatar, useMediaQuery } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../constants/constants';
import '../App.css'
import { useSelector } from 'react-redux'
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function NavBar(props) {
    const dispatch = useDispatch()
    const user_data = useSelector(state => state.reducer.user)
    const currentOpenComp = useSelector(state => state.reducer.currentOpenComp)
    const searchTerm = useSelector(state => state.reducer.searchTerm)
    
    const iconMediaquery = useMediaQuery('(min-width:1110px)')
    // useEffect(()=>{
    //     console.log("in useeffect navbar")
    //     setSearchWord(searchTerm)
    // },[searchTerm])

    const handleProfileMenuOpen = () => {
        dispatch({ type: ActionTypes.ACCCOMP_DISPLAY })
    };

    const Searchbox = (e) => {
        if(e.target.value.split("")[0]!==" " && e.target.value !== ""){
            // console.log("in if",e.target.value.split(""))
            dispatch({ type: ActionTypes.SEARCHTERM, payload: e.target.value.toLowerCase() })
            dispatch({ type: ActionTypes[currentOpenComp], payload: false })
            dispatch({ type: ActionTypes.SEARCH_COMP_DISPLAY,payload:""})
        }
        else if(e.target.value === ""){
            // console.log("in else if",e.target.value,currentOpenComp)
            dispatch({type:ActionTypes[currentOpenComp] ,payload:false})
            dispatch({type:ActionTypes.INBOX_DISPLAY,payload:true})
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ bgcolor: "#ffffff", boxShadow: "0px 0px 0px" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            onClick={() => dispatch({ type: ActionTypes.SIDEBAR_DISPLAY })}
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {!iconMediaquery ? <Avatar
                            variant="rounded"
                            alt="logo"
                            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"


                            sx={{ width: "10%",width:60,height:60 }}
                        /> :
                            <Avatar
                                variant="rounded"
                                alt="logo"
                                src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
                                sx={{ minWidth: "10%", width:30,height:30}}
                            />
                        }
                        <Search
                            sx={{ ml: "5%", mr: "15%"}}
                            onChange={(e) => Searchbox(e)}
                        >
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{marginLeft:"auto"}} >
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                onClick={() => handleProfileMenuOpen()}

                            >
                                <AccountCircle fontSize="large" />
                            </IconButton>

                        </Box>
                    </Toolbar>
                    <Divider sx={{ pb: "1rem" }} />
                </AppBar>
            </Box>

        </>
    );
}
