import React from 'react';
import { Dialog, DialogTitle,TextField, DialogContent, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Facebook, Twitter, Reddit } from '@material-ui/icons';

const useStyles = makeStyles({
    paper: {
        width: '40%',
        height: '60%',
        display:'flex',
        alignItems:'center'
    },
    dialogContent:{
        '&>*': {
            margin: '3% 4% 0 0'
        }
    },
    loginIcons: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    fb: {
        color:'blue'
    },
    twitter: {
        color:'cornflowerblue'
    },reddit: {
        color:'red'
    }
});
export default function login(props){
    const {open, toggleOpen} = props;
    const classes = useStyles();
    return (
        <Dialog open={open} onClose={toggleOpen(false)} classes={{paper: classes.paper}}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <TextField
                fullWidth
                variant='outlined'
                label='User Name' />
                <TextField
                fullWidth
                variant='outlined'
                label='Password' />
                <Button variant='contained' color='primary'>Login</Button>
                <Button variant='contained'>Signup</Button>
                <div className={classes.loginIcons}>
                    <IconButton><Facebook fontSize='large' className={classes.fb} /></IconButton>
                    <IconButton><Twitter fontSize='large' className={classes.twitter} /></IconButton>
                    <IconButton><Reddit fontSize='large' className={classes.reddit} /></IconButton>
                </div>
            </DialogContent>
        </Dialog>
    );
}