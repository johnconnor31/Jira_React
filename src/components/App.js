import React from 'react';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Header from './Header';
import LeftSideMenu from './LeftSideMenu';
import SearchWidget from './SearchWidget';
import TicketList from './TicketList';
import LoginDialog from './loginDialog';

const drawerWidth = '240';
const useStyles = makeStyles(theme => ({
    paperStyle: {
        minHeight:'98.2vh',
        width: props => props.openDrawer ?  `calc(100%-${drawerWidth}px)` : `calc(100%)px` ,
        marginLeft: props => props.openDrawer ? `${drawerWidth-5}px` : '65px',
        transition: props => theme.transitions.create(['width','margin'], {
            easing: theme.transitions.easing.sharp,
            duration: props.openDrawer ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen
        })
    }
}));

export default function App() {
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [mode, setMode] = React.useState('light');
    const [subOptions, setSubOptions] = React.useState([]);
    const classes = useStyles({openDrawer});
    function toggleDrawer() {
        openDrawer ? setOpenDrawer(false): setOpenDrawer(true);
    }
    function toggleLogin(open) {
     return () => setOpenLogin(open);
    }
    function switchMode(){
        if(mode==='light') {
            setMode('dark');
        } else {
            setMode('light');
        }
    }
    const theme = createMuiTheme({
        palette:{
            primary: {
                main: mode ==='dark' ? '#002f00' : '#f44336'
              },
              secondary: {
                main: mode ==='dark' ? '#b8c2d1' : '#f44336'
              },
            type:mode
        }
    });
        return(
            <ThemeProvider theme={theme}>
            <LeftSideMenu open={openDrawer} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} />
            <Paper variant='outlined' className={classes.paperStyle}>
                <Header switchMode={switchMode} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} toggleLogin={toggleLogin} />
                <SearchWidget subOptions={subOptions} setSubOptions={setSubOptions} />
                <TicketList subOptions={subOptions} />
            </Paper>
            <LoginDialog open={openLogin} toggleOpen={toggleLogin} />
            </ThemeProvider>
        );
};