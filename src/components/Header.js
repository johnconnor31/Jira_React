import React from 'react';
import { AppBar, Toolbar, Button, IconButton,Typography, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) =>({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    thumb:{
        color: theme.palette.type === 'dark' && 'gray' 
    },
    track: {
        backgroundColor: 'gray'
    } 

}));

export default function Header(props) {
    const switchMode = props.switchMode;

    const styles = useStyles();
    return (
        <AppBar position='static'>
                <Toolbar>
                    <IconButton className={styles.menuButton} edge='start'>
                        <MenuIcon />
                    </IconButton>
                    <Typography className={styles.title} variant='h6'>
                        Jira Dashboard
                    </Typography>
                    <Switch onChange={switchMode} color={switchMode==='dark' ? 'default' : '' } />
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
    );
}