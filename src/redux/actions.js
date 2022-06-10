import axios from "axios"
import { url } from "../apis/api"
import { ActionTypes } from "../constants/constants"
import jwt_decode from 'jwt-decode'


export const Token_set=(response)=>async dispatch=>{
    try {
//         console.log(response)
        window.localStorage.setItem('token',response)
        dispatch({
            type:ActionTypes.SET_TOKEN,
            payload:jwt_decode(response)
        })
    } catch (error) {
        console.log("err:",error)
    }
}

export const ApiCall_msgs = (_id)=> async dispatch=>{
    try {
        const response = await axios.get(`${url}/inbox/${_id}`)
        // //console.log(response)
        if(!response.data.msg){
            dispatch({ type:ActionTypes.FETCH_MAILS, payload:response.data })
            window.location.reload()

        }
    } catch (error) {
        throw error
    }
} 

export const DeleteMsgsInbox =(uid,array)=>async dispatch=>{
    try {
        const response = await axios.post(`${url}/inbox/bin/${uid}`,{
            arr:array
        })
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()
        //console.log(response)
    } catch (error) {
        throw error
    }
}

export const DeleteMsgsSent =(uid,array)=>async dispatch=>{
    try {
        const response = await axios.post(`${url}/sent/bin/${uid}`,{
            arr:array
        })
        //console.log(response)
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()

    } catch (error) {
        throw error
    }
}

export const DeleteMsgsDraft =(uid,array)=>async dispatch=>{
    try {
        const response = await axios.post(`${url}/draft/bin/${uid}`,{
            arr:array
        })
        //console.log(response)
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()

    } catch (error) {
        throw error
    }
}

export const DeleteMsgsStarred =(uid,array)=>async dispatch=>{
    try {
        const response = await axios.post(`${url}/starred/bin/${uid}`,{
            arr:array
        })
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()
    } catch (error) {
        throw error
    }
}

export const PermanentDelete =(uid,array)=>async dispatch=>{
    try {
        console.log("in Pdelete api call")
        const response = await axios.post(`${url}/delete/${uid}`,{
          arr:array
        })
        console.log(response.data)
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()
    } catch (error) {
        console.log("err:",error)
    }
}

export const StarredMsg = (uid,_id)=>async dispatch=>{
    try {
        let response = await axios.patch(`${url}/starred/${uid}`,{
            id:_id
        })
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()

        
    } catch (err) {
        console.log("err:",err)
    }
}
export const UnStarredMsg = (uid,_id)=>async dispatch=>{
    try {
        let response = await axios.patch(`${url}/unstarred/${uid}`,{
            id:_id
        })
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()


    } catch (err) {
        console.log("err:",err)
    }
}
export const StarredMsg_Sent = (uid,_id)=>async dispatch=>{
    try {
        let response = await axios.patch(`${url}/sent/starred/${uid}`,{
            id:_id
        })
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()

        
    } catch (err) {
        console.log("err:",err)
    }
}
export const UnStarredMsg_Sent = (uid,_id)=>async dispatch=>{
    try {
        let response = await axios.patch(`${url}/sent/unstarred/${uid}`,{
            id:_id
        })
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()


    } catch (err) {
        console.log("err:",err)
    }
}

export const MarkallRead = (string,_id)=>async dispatch=>{
    try {
        let response = await axios.get(`${url}/allread/${_id}/?s=${string}`)
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()
    } catch (err) {
        console.log('err',err)
    }
}
export const MarkallunRead = (string,_id)=>async dispatch=>{
    try {
        let response = await axios.get(`${url}/allunread/${_id}/?s=${string}`)
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()

    } catch (err) {
        console.log('err',err)
    }
}

export const RestoreAll = (array,_id)=>async dispatch=>{
    try {
        let response = await axios.patch(`${url}/restore/${_id}`,{
            arr : array
        })
        if(!response.data.msg){
            dispatch({type:ActionTypes,payload:response.data})
            window.location.reload()
        }
    } catch (err) {
        console.log("err",err)
    }
}

export const DraftMsg = (message,_id)=>async dispatch=>{
    try {
        let response = await axios.patch(`${url}/draft/${_id}`,{
            msg:message
        })
        dispatch({type:ActionTypes.FETCH_MAILS,payload:response.data})
        window.location.reload()
    } catch (err) {
        console.log("err:",err)
    }
}
