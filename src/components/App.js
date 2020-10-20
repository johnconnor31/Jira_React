import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import LeftSideMenu from './LeftSideMenu';
import SearchWidget from './SearchWidget';
// import SearchWidget from 'autoautocomplete';
import TicketList from './TicketList';
import options from '../static/filters_mock.json';


const drawerWidth = '240';
const useStyles = makeStyles(theme => ({
    paperStyle: {
        minHeight:'98.2vh',
        width: props => props.openDrawer &&  `calc(100%-${drawerWidth}px)` ,
        marginLeft: props => props.openDrawer ? `${drawerWidth-5}px` : '65px',
        transition: props => theme.transitions.create(['width','margin'], {
            easing: theme.transitions.easing.sharp,
            duration: props.openDrawer ? theme.transitions.duration.leavingScreen : theme.transitions.duration.leavingScreen
        })
    }
}));

export default function App() {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [mode, setMode] = React.useState('light');
    const [subOptions, setSubOptions] = React.useState([]);
    function setFilter(filter) {
        if(filter === 'Open Issues') {
            setSubOptions([{
                name: 'status',
                values: ['Open']
            }]);
        } else if(filter === 'Assigned to Me') {
            setSubOptions([{
                name: 'Assignee',
                values: ['Sairam Singireesu']
            }]);
        } else {
            setSubOptions([{
                    name: 'Assignee',
                    values: ['Sairam Singireesu']
                },{
                name: 'Created Date',
                values: new Date()
            }]);
        }
    }
    const classes = useStyles({openDrawer});
    function toggleDrawer() {
        openDrawer ? setOpenDrawer(false): setOpenDrawer(true);
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
            <MuiThemeProvider theme={theme}>
            <LeftSideMenu open={openDrawer} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} setFilter={setFilter} />
            <Paper variant='outlined' className={classes.paperStyle}>
                <Header switchMode={switchMode} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} />
                <SearchWidget subOptions={subOptions} setSubOptions={setSubOptions} options={options} />
                <TicketList subOptions={subOptions} />
            </Paper>
            </MuiThemeProvider>
        );
};