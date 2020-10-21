import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MenuIcon from '@material-ui/icons/Menu';
import Logout from '@material-ui/icons/PowerSettingsNew';
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
    const [isLoggingIn, setIsLoggingIn ] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const { switchMode, toggleDrawer } = props;

    function toggleLogin(open) {
        return () => setOpenLogin(open);
    }

    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if(searchParams.toString()){ 
            getUserName(searchParams);
        }
    },[]);
    function getUserName(searchParams) {
        fetch('/twitterLogin/accessToken?'+searchParams.toString()).then(response => {
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
                       userName ? <IconButton onClick={()=> setUserName('')}><Logout /></IconButton> :
                                <Button color='inherit' variant='outlined' onClick={toggleLogin(true)}>{ isLoggingIn ? 'Logging you in...':'Login'}</Button>
                    }
                </Toolbar>
                <LoginDialog open={openLogin} toggleOpen={toggleLogin} />
            </AppBar>
    );
}