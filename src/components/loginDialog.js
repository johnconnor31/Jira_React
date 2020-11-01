import React from 'react';
import { Dialog, DialogTitle,TextField, DialogContent, Button, IconButton, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Facebook, Twitter, Reddit, ArrowBackIos } from '@material-ui/icons';

const useStyles = makeStyles({
    paper: {
        width: '40%',
        minHeight: '20%',
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
    const {open, toggleOpen, setUserName} = props;
    const [isProcessing, toggleProcessing] = React.useState(false);
    const [loginFailure, toggleLoginFailure] = React.useState(false);
    const [isSignup, toggleSignup] = React.useState(false);
    const [values,setValues] = React.useState({
        userName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = React.useState({});
    const classes = useStyles();
    const login = (type) => () => {
        if(type==='Twitter') {
            requestToken();
        }
    }
    function requestToken() {
        fetch('/myServer/twitterLogin/requestToken').then((response) => {
            console.log('response is', response);
            if(response.status===200) {
                response.text().then(resText =>{
                console.log('parsed resp', resText);
                window.location.replace(`https://api.twitter.com/oauth/authenticate?${resText}`);
                });
            } else {
                console.log('error in response', response.statusText);
                toggleLoginFailure(true);
            }
        });
        toggleProcessing(true);
    }
    function resetForm() {
        toggleLoginFailure(false);
        toggleProcessing(false);
        backToLogin();
    }
    function normalLogin() {
        const hasErrors = checkErrors('login');
        if(!hasErrors) {
            console.log('logging in');
            fetch('/myServer/login', 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then( response => {
                if( response.status === 404 ) {
                        console.log('Error logging in');
                        setErrors({
                            userName: 'There was an error logging in'
                        });
                } else {
                    response.json().then(res => {
                        console.log('user found', res);
                        resetForm();
                        toggleOpen(false)();
                        setUserName(res._id);
                    })
                }
            })
        }
    }
    function signUp() {
        const hasErrors = checkErrors();
        if(!hasErrors) {
            fetch('/myServer/signUp',
            {
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then( response => {
                if(response.status === 422) {
                    response.json().then( err => {
                        console.log('error response is', err);
                        const currentErrors = {};
                        currentErrors[err.fieldName] = `That ${err.fieldName} already exists.`;
                        setErrors(currentErrors);
                    })
                } else {
                    if(response.status === 200) {
                        backToLogin();
                    }
                }
            }).catch( error => console.log('error posting', error));
        }
    }
    const changeValue = fieldName => (e) => {
        const currentValues = Object.assign({},values);
        currentValues[fieldName] = e.target.value;
        setValues(currentValues);
    }
    function checkErrors(login){
        const currentErrors = Object.assign({}, errors);
        for(const key in values) {
            if(!values[key]) {
                if(!login || key!=='email' )
                currentErrors[key] = 'Please enter '+key;
            } else {
                delete currentErrors[key];
            }
        }
        console.log('checking errors', errors);
        setErrors(currentErrors);
        return Object.keys(currentErrors).length;
    }

    function backToLogin(){
        toggleSignup(false);
        setErrors({});
        setValues({
            userName: '',
            email: '',
            password: ''
        })
    }
    
    return (
        <Dialog open={open} onClose={toggleOpen(false)} onExited={resetForm} classes={{paper: classes.paper}}>
            {isProcessing ? loginFailure ? <Typography style={{margin:'auto'}}>Login Failed</Typography> : <CircularProgress style={{margin:'auto'}} /> 
            : <>
            <div style={{display:'flex', width: '100%', justifyContent:'center'}}>
            {isSignup && <IconButton style={{left:'-35%'}} onClick={backToLogin}><ArrowBackIos /></IconButton>}
            <DialogTitle>Login</DialogTitle>
            </div>
            <DialogContent className={classes.dialogContent}>
                <TextField
                fullWidth
                variant='outlined'
                label='User Name'
                helperText={errors['userName']}
                error={errors['userName']}
                value={values.userName}
                onChange={changeValue('userName')} />
                {isSignup && 
                <TextField
                fullWidth
                variant='outlined'
                label='Email'
                helperText={errors['email']}
                error={errors['email']}
                value={values.email}
                onChange={changeValue('email')} />
                }
                <TextField
                fullWidth
                variant='outlined'
                type='Password'
                label='Password'
                helperText={errors['password']}
                error={errors['password']}
                value={values.password}
                onChange={changeValue('password')} />
                {!isSignup ?
                <>
                    <Button variant='contained' color='primary' onClick={normalLogin}>Login</Button>
                    <Button variant='contained' onClick={() => toggleSignup(true)}>Signup</Button>
                </> : 
                    <Button variant='contained' color='primary' onClick={signUp}>Sign Me UP!</Button>
                }
                <div className={classes.loginIcons}>
                    <IconButton><Facebook fontSize='large' className={classes.fb} /></IconButton>
                    <IconButton onClick={login('Twitter')}><Twitter fontSize='large' className={classes.twitter} /></IconButton>
                    <IconButton><Reddit fontSize='large' className={classes.reddit} /></IconButton>
                </div>
            </DialogContent>
            </>}
        </Dialog>
    );
}