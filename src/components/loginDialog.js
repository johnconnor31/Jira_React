import React from 'react';
import { Dialog, DialogTitle,TextField, DialogContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    paper: {
        width: '40%',
        height: '50%',
        display:'flex',
        alignItems:'center'
    },
    dialogContent:{
        '&>*': {
            margin: '3% 4% 0 0'
        }
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
            </DialogContent>
        </Dialog>
    );
}