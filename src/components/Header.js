import React from 'react';
import { AppBar, Toolbar, Button, IconButton,Typography, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import LoginDialog from './loginDialog.js';

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
    const [openLogin, setOpenLogin] = React.useState(false);
    const { switchMode, toggleDrawer } = props;
    const [userName, setUserName] = React.useState('');

    function toggleLogin(open) {
        return () => setOpenLogin(open);
    }

    function requestToken() {
        fetch('/twitterLogin/requestToken').then((response) => {
            console.log('response is', response);
            if(response.status===200) {
                response.text().then(resText =>{
                console.log('parsed resp', resText);
                window.location.replace(`https://api.twitter.com/oauth/authenticate?${resText}`);
                });
            } else {
                console.log('error in response', response.statusText);
            }
        });
    }
    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        getUserName(searchParams);
    });
    function getUserName(searchParams) {
        fetch('/twitterLogin/accessToken?'+searchParams).then(response => {
            console.log('resp', response);
            if(response.status===200) {
                response.text().then(resText => {
                    const userName = resText.split('screen_name=')[1];
                    if(userName){
                        setUserName(userName);
                    }
                    window.history.pushState('Jira','', '/');
                })
            }
        });
    }
    
    const styles = useStyles();
    return (
        <AppBar position='static'>
                <Toolbar>
                    <IconButton className={styles.menuButton} edge='start' onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography className={styles.title} variant='h6'>
                        Jira Dashboard
                    </Typography>
                    <Switch onChange={switchMode} />
                    {userName && <Typography>Welcome {userName}</Typography>}  
                    {
                       userName ? <Button color='inherit' variant='outlined' onClick={()=> setUserName('')}>Logout</Button> :
                                <Button color='inherit' variant='outlined' onClick={toggleLogin(true)}>Login</Button>
                    }
                </Toolbar>
                <LoginDialog open={openLogin} toggleOpen={toggleLogin} requestToken={requestToken} />
            </AppBar>
    );
}