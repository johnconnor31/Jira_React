import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LockOpen, AssignmentInd, List as AllList } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    drawerStyles: {
        width: props =>  props.drawerWidth+'px',
        transition: props => theme.transitions.create(['width','margin'], {
            easing: theme.transitions.easing.sharp,
            duration: props.open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen
        })
    }
}));

export default function drawer(props) {
    const { open } = props;
    const classes = useStyles(props);
    const menuOptions = ['Open Issues', 'Assigned to Me', 'All Issues'];
    return (
        <Drawer open={open} variant='persistent'>
            <Typography style={{margin: '10% 30%'}}>Quick Links</Typography>
            <Divider />
            <List className={classes.drawerStyles}>
                {
                menuOptions.map((val, i) => <ListItem button>
                    {i===0 && <ListItemIcon><LockOpen /></ListItemIcon>}
                    {i===1 && <ListItemIcon><AssignmentInd /></ListItemIcon>}
                    {i===2 && <ListItemIcon><AllList /></ListItemIcon>}
                    <ListItemText>
                        {val}
                    </ListItemText>
                </ListItem>)
            }
            </List>
        </Drawer>
    );
}