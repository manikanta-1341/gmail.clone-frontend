import { ActionTypes } from "../constants/constants";
const INITIAL_STATE = {
    token: "",
    OpenMsgDetails: "",
    draftMsg:"",
    searchTerm: "",
    user: [],
    checkList: [],
    SentboxcheckList: [],
    DraftcheckList: [],
    StarredcheckList: [],
    BincheckList: [],
    inboxOpen: true,
    sentCompOpen: false,
    draftCompOpen:false,
    binCompOpen: false,
    starredCompOpen: false,
    sidebarOpen: true,
    composeOpen: false,
    accDetailsOpen: false,
    allInboxMsgsChecked: false,
    msgDetailsCompOpen: false,
    searchCompOpen: false,
    currentOpenComp: "INBOX_DISPLAY",
}

export default function reducer(state = INITIAL_STATE, { type, payload }) {
    switch (type) {
        case ActionTypes.FETCH_MAILS: {
            return {
                ...state,
                user: payload
            }
        }
        case ActionTypes.SET_TOKEN: {
            return {
                ...state,
                token: payload
            }
        }
        case ActionTypes.SIDEBAR_DISPLAY: {
            return {
                ...state,
                sidebarOpen: !state.sidebarOpen
            }
        }
        case ActionTypes.INBOX_DISPLAY: {
            if (payload === "") {

                return {
                    ...state,
                    inboxOpen: !state.inboxOpen,
                    currentOpenComp: "INBOX_DISPLAY"
                }
            }
            else {
                return {
                    ...state,
                    inboxOpen: payload,
                    currentOpenComp: "INBOX_DISPLAY"
                }
            }
        }
        case ActionTypes.SENTCOMP_DISPLAY: {
            if (payload === "") {

                return {
                    ...state,
                    sentCompOpen: !state.sentCompOpen,
                    currentOpenComp: "SENTCOMP_DISPLAY"
                }
            }
            else {
                return {
                    ...state,
                    sentCompOpen: payload,
                    currentOpenComp: "SENTCOMP_DISPLAY"
                }
            }
        }
        case ActionTypes.DRAFTCOMP_DISPLAY: {
            if (payload === "") {

                return {
                    ...state,
                    draftCompOpen: !state.draftCompOpen,
                    currentOpenComp: "DRAFTCOMP_DISPLAY"
                }
            }
            else {
                return {
                    ...state,
                    draftCompOpen: payload,
                    currentOpenComp: "DRAFTCOMP_DISPLAY"
                }
            }
        }
        case ActionTypes.BINCOMP_DISPLAY: {
            if (payload === "") {

                return {
                    ...state,
                    binCompOpen: !state.binCompOpen,
                    currentOpenComp: "BINCOMP_DISPLAY"
                }
            }
            else {

                return {
                    ...state,
                    binCompOpen: payload,
                    currentOpenComp: "BINCOMP_DISPLAY"
                }
            }
        }
        case ActionTypes.STARREDCOMP_DISPLAY: {
            if (payload === "") {

                return {
                    ...state,
                    starredCompOpen: !state.starredCompOpen,
                    currentOpenComp: "STARREDCOMP_DISPLAY"
                }
            }
            return {
                ...state,
                starredCompOpen: payload,
                currentOpenComp: "STARREDCOMP_DISPLAY"
            }
        }
        case ActionTypes.COMPOSE_DISPLAYOPEN: {
            return {
                ...state,
                composeOpen: true
            }
        }
        case ActionTypes.COMPOSE_DISPLAYCLOSE: {
            return {
                ...state,
                composeOpen: false
            }
        }
        case ActionTypes.ACCCOMP_DISPLAY: {
            return {
                ...state,
                accDetailsOpen: !state.accDetailsOpen
            }
        }
        case ActionTypes.CHECKLIST: {
            return {
                ...state,
                checkList: payload
            }
        }
        case ActionTypes.SENTCHECKLIST: {
            return {
                ...state,
                SentboxcheckList: payload
            }
        }
        case ActionTypes.DRAFTCHECKLIST: {
            return {
                ...state,
                DraftcheckList: payload
            }
        }
        case ActionTypes.STARREDCHECKLIST: {
            return {
                ...state,
                StarredcheckList: payload
            }
        }
        case ActionTypes.BINCHECKLIST: {
            return {
                ...state,
                BincheckList: payload
            }
        }
        case ActionTypes.INBOX_MSGS_CHECKED: {
            if (payload === "") {
                // console.log("in payload empty")
                return {
                    ...state,
                    allInboxMsgsChecked: !state.allInboxMsgsChecked
                }
            }
            else {
                switch (payload) {
                    case "all": {
                        return {
                            ...state,
                            allInboxMsgsChecked: true
                        }
                    }
                    case "yes": {
                        return {
                            ...state,
                            allInboxMsgsChecked: "yes"
                        }
                    }
                    case "no": {
                        return {
                            ...state,
                            allInboxMsgsChecked: "no"
                        }
                    }
                    case "none": {
                        return {
                            ...state,
                            allInboxMsgsChecked: false
                        }
                    }
                    default: {
                        return state
                    }
                }
            }
        }
        case ActionTypes.MSG_DETAILS: {
            return {
                ...state,
                OpenMsgDetails: payload
            }
        }
        case ActionTypes.REFRESH: {
            return {
                ...state,
                checkList: [],
                SentboxcheckList: [],
                StarredcheckList: [],
                BincheckList: [],
                inboxOpen: true,
                sentCompOpen: false,
                binCompOpen: false,
                starredCompOpen: false,
                sidebarOpen: true,
                composeOpen: false,
                accDetailsOpen: false,
                allInboxMsgsChecked: false,
                msgDetailsCompOpen: false,
                searchCompOpen: false,
                currentOpenComp: "INBOX_DISPLAY",

            }
        }
        case ActionTypes.MSG_DETAILSCOMP_DISPLAY: {
            if (payload === "") {

                return {
                    ...state,
                    msgDetailsCompOpen: !state.msgDetailsCompOpen,
                    currentOpenComp: "MSG_DETAILSCOMP_DISPLAY"
                }
            }
            else {

                return {
                    ...state,
                    msgDetailsCompOpen: payload,
                    currentOpenComp: "MSG_DETAILSCOMP_DISPLAY"
                }
            }
        }
        case ActionTypes.SEARCHTERM: {
            return {
                ...state,
                searchTerm: payload
            }
        }
        case ActionTypes.SEARCH_COMP_DISPLAY: {
            if (payload === "") {
                return {

                    ...state,
                    searchCompOpen: !state.searchCompOpen,
                    currentOpenComp: "SEARCH_COMP_DISPLAY"
                }
            }
            else {

                return {

                    ...state,
                    searchCompOpen: payload,
                    currentOpenComp: "SEARCH_COMP_DISPLAY"
                }
            }
        }
        case ActionTypes.DRAFTMSG:{
            return{
                ...state,
                draftMsg : payload
            }
        }
        default: {
            return state
        }
    }
}