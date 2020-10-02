import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LockOpen, AssignmentInd, List as AllList, Link } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    drawerOpen: {
        width: props =>  props.drawerWidth+'px',
        transition: theme.transitions.create(['width','margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        width: '70px',
        transition: theme.transitions.create(['width','margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    drawerList: {
        '&$hover': {
            background:'gray'
        },
        marginLeft: '8px'
    },
    drawerHead : {
        height: '11%', 
        display: 'flex', 
        justifyContent:'center', 
        alignItems: 'center'
    }
}));

export default function drawer(props) {
    const { open, toggleDrawer } = props;
    const classes = useStyles(props);
    const menuOptions = ['Open Issues', 'Assigned to Me', 'All Issues'];
    return (
        <Drawer open={open} variant='permanent' classes={{paper: open ? classes.drawerOpen : classes.drawerClose}}>
            <Typography onClick={props.toggleDrawer} className={classes.drawerHead}>{open ? 'Quick Links' : <Link />}</Typography>
            <Divider />
            <List>
                {
                menuOptions.map((val, i) => <ListItem button className={classes.drawerList}>
                    {i===0 && <ListItemIcon><LockOpen /></ListItemIcon>}
                    {i===1 && <ListItemIcon><AssignmentInd /></ListItemIcon>}
                    {i===2 && <ListItemIcon><AllList /></ListItemIcon>}
                    {open && <ListItemText>
                        {val}
                    </ListItemText>
                    }
                </ListItem>)
            }
            </List>
        </Drawer>
    );
}