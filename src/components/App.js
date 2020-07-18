import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton,Typography } from '@material-ui/core';
import SearchWidget from './SearchWidget';

const useStyles = makeStyles(theme =>({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));
export default function App() {
    const styles = useStyles();
        return(
            <>
            <AppBar position='static' className={styles.root}>
                <Toolbar>
                    <IconButton className={styles.menuButton} edge='start'>
                        <MenuIcon />
                    </IconButton>
                    <Typography className={styles.title} variant='h6'>
                        Jira Dashboard
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <SearchWidget />
            </>
        );
};