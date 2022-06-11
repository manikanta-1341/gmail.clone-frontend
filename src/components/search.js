
import { Box, Table, TableBody, TableCell, TableRow, Typography,Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";




export default function SearchComp() {

    const user_data = useSelector(state => state.reducer.user)
    const searchTerm = useSelector(state => state.reducer.searchTerm)
    const [searchWord, setSearchWord] = useState([])
    const [searched_data, setSearched_data] = useState({
        "inbox": [],
        "sentbox": [],
        "bin": []
    })
    useEffect(() => {
        setSearched_data('')
        setSearchWord(searchTerm)
        Filter()
    }, [searchWord, searchTerm])

    const Filter = () => {
        let inboxState = []
        let sentState = []
        let binState = []
        user_data.inbox.map((el) => {
            if (
                el.msg.toLowerCase().includes(searchTerm) ||
                el.subject.toLowerCase().includes(searchTerm) ||
                el.Time.toLowerCase().includes(searchTerm) ||
                el.date.toLowerCase().includes(searchTerm) ||
                el.from.toLowerCase().includes(searchTerm)
            ) {
                // //console.log(el)
                inboxState.push(el)
            }
            return el
        })
        user_data.sentMail.map((el) => {
            if (
                el.msg.toLowerCase().includes(searchTerm) ||
                el.subject.toLowerCase().includes(searchTerm) ||
                el.Time.toLowerCase().includes(searchTerm) ||
                el.date.toLowerCase().includes(searchTerm) ||
                el.to.toLowerCase().includes(searchTerm)
            ) {
                sentState.push(el)
            }
            return el
        })
        user_data.bin.map((el) => {
            if (el.to) {

                if (
                    el.msg.toLowerCase().includes(searchTerm) ||
                    el.subject.toLowerCase().includes(searchTerm) ||
                    el.Time.toLowerCase().includes(searchTerm) ||
                    el.date.toLowerCase().includes(searchTerm) ||
                    el.to.toLowerCase().includes(searchTerm)
                ) {
                    binState.push(el)
                }
            }
            else if (el.from) {
                if (
                    el.msg.toLowerCase().includes(searchTerm) ||
                    el.subject.toLowerCase().includes(searchTerm) ||
                    el.Time.toLowerCase().includes(searchTerm) ||
                    el.date.toLowerCase().includes(searchTerm) ||
                    el.from.toLowerCase().includes(searchTerm)
                ) {
                    binState.push(el)
                }
            }
            return el
        })
        setSearched_data({ ...searched_data, inbox: [...inboxState], sentbox: [...sentState], bin: [...binState] })
        //console.log(searched_data)
    }
    return (
        <>
            {searched_data !== "" ? <Box>
                <Table>
                    <TableBody>
                        {searched_data.inbox?.map((e) => {
                            return <TableRow key={e._id}>
                                <TableCell>
                                    <Typography>{e.from ? e.from : e.to}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Grid
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Typography component="span"
                                            sx={{ backgroundColor: "#0000006b", py: "2px", px: "4px", textalign: "center", borderRadius: "5px" }}
                                        >Inbox</Typography>
                                        <Typography>
                                            {e.subject}
                                        </Typography>
                                    </Grid>
                                </TableCell>
                                <TableCell>
                                    <Typography>{e.date} &nbsp; {
                                                new Date(e.Time).toLocaleTimeString().split("").length === 11?
                                                    new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 5 && i != 6 && i !== 7)
                                                :
                                                 new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 4 && i != 5 && i !== 6)
}</Typography>
                                </TableCell>
                            </TableRow>
                        })
                        }
                        {searched_data.sentbox?.map((e) => {
                            return <TableRow key={e._id}>
                                <TableCell>
                                    <Typography>{e.from ? e.from : e.to}</Typography>
                                </TableCell>
                                <TableCell>

                                    <Typography>{e.subject}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{e.date} &nbsp; {
                                                new Date(e.Time).toLocaleTimeString().split("").length === 11?
                                                    new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 5 && i != 6 && i !== 7)
                                                :
                                                 new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 4 && i != 5 && i !== 6)
}</Typography>
                                </TableCell>
                            </TableRow>
                        })
                        }
                        {searched_data.bin?.map((e) => {
                            return <TableRow key={e._id}>
                                <TableCell>
                                    <Typography>{e.from ? e.from : e.to}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Grid
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Typography component="span"
                                            sx={{ backgroundColor: "#0000006b", py: "2px", px: "4px", textalign: "center", borderRadius: "5px" }}
                                        >Bin</Typography>
                                        <Typography>{e.subject}</Typography>
                                    </Grid>
                                </TableCell>
                                <TableCell>
                                    <Typography>{e.date} &nbsp; {
                                                new Date(e.Time).toLocaleTimeString().split("").length === 11?
                                                    new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 5 && i != 6 && i !== 7)
                                                :
                                                 new Date(e.Time).toLocaleTimeString().split("").filter((e, i) => i != 4 && i != 5 && i !== 6)
}</Typography>
                                </TableCell>
                            </TableRow>
                        })
                        }
                    </TableBody>
                </Table>
            </Box>
                :
                <></>
            }

        </>
    );
}