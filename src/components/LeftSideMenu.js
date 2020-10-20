import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/styles/makeStyles';
import { LockOpen, AssignmentInd, Today, Link } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    drawerOpen: {
        overflowX: 'hidden',
        width: props =>  props.drawerWidth+'px',
        transition: theme.transitions.create(['width','margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    drawerClose: {
        overflowX: 'hidden',
        width: '70px',
        transition: theme.transitions.create(['width','margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    drawerList: {
        marginLeft: '8px'
    },
    drawerHead : {
        height: '7.5%', 
        display: 'flex', 
        justifyContent:'center', 
        alignItems: 'center'
    }
}));

export default function drawer(props) {
    const { open, toggleDrawer, setFilter } = props;
    const [selected, setSelected] = React.useState('');
    const classes = useStyles(props);
    const menuOptions = ['Open Issues', 'Assigned to Me', 'Created Today'];
    function filterSelect(filter) {
        return () => {
            setSelected(filter);
            setFilter(filter);
        }
    }
    return (
        <Drawer open={open} variant='permanent' classes={{paper: open ? classes.drawerOpen : classes.drawerClose}}>
            <Typography onClick={toggleDrawer} className={classes.drawerHead}>{open ? 'Quick Links' : <Link />}</Typography>
            <Divider />
            <List>
                {
                menuOptions.map((val, i) => <ListItem button selected={selected === val} className={classes.drawerList} onClick={filterSelect(val)}>
                    {i===0 && <ListItemIcon><LockOpen /></ListItemIcon>}
                    {i===1 && <ListItemIcon><AssignmentInd /></ListItemIcon>}
                    {i===2 && <ListItemIcon><Today /></ListItemIcon>}
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