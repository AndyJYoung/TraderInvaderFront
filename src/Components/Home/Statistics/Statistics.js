import React, { useState, useEffect } from 'react'
import {
    Paper, makeStyles, Table, ListSubheader, Typography,
    TableHead, TableBody, TableRow, TableCell,
    List, Divider, ListItem, ListItemText
} from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles({
    cell: {
        "&:hover": {
            backgroundColor: '#DEDEDE',
        }
    }
})



export default function Statistics(props) {
    const classes = useStyles()
    const [achievements, SetAchievements] = useState([])

    useEffect(() => {
        if (props.username) {
            axios.get(`/users/${props.username}/achievements`, {
            })
                .then(res => {
                    const { data } = res.data
                    SetAchievements(data)
                })
                .catch(err => console.log(err))
        }
    }, [props.username, SetAchievements])

    return (
        <div>
            <Paper style={{ backgroundColor: 'white', margin: '10px 0 0 0', width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow className={classes.cell}>
                            <TableCell>
                                <Typography variant='h5' style={{ color: 'black' }}>Statistics</Typography>
                            </TableCell>
                            <TableCell><React.Fragment /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={classes.cell}>
                            <TableCell>Games Won</TableCell>
                            <TableCell><React.Fragment /></TableCell>
                        </TableRow>
                        <TableRow className={classes.cell}>
                        </TableRow>
                        <TableRow className={classes.cell}>
                            <TableCell>Games Lost</TableCell>
                            <TableCell><React.Fragment /></TableCell>
                        </TableRow>
                        <TableRow className={classes.cell}>
                            <TableCell>Win Streak</TableCell>
                            <TableCell><React.Fragment /></TableCell>
                        </TableRow>
                        <TableRow className={classes.cell}>
                            <TableCell>Loss Streak</TableCell>
                            <TableCell><React.Fragment /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>

            <Paper className={classes.paper} style={{ margin: '10px 0 0 0', padding: '10px 0' }}>
                <List>
                    <ListSubheader color='primary'>
                        <Typography variant='h5' style={{ color: 'black', padding: '0 0 10px 0' }}>Achievements</Typography>
                    </ListSubheader>
                    {achievements.map((achievement, id) => (
                        <React.Fragment key={id}>
                            <Divider />
                            <ListItem className={classes.row}>
                                <ListItemText>{achievement}</ListItemText>
                            </ListItem>
                        </React.Fragment>))
                    }
                </List>
            </Paper>
        </div>
    )
}
