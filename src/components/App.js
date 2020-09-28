import React from 'react';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Header from './Header';
import SearchWidget from './SearchWidget';
import TicketList from './TicketList';

export default function App() {
    const [mode, setMode] = React.useState('light');
    const [subOptions, setSubOptions] = React.useState([]);
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
            <Paper variant='outlined' style={{minHeight:'98.2vh'}}>
                <Header switchMode={switchMode} />
                <SearchWidget subOptions={subOptions} setSubOptions={setSubOptions} />
                <TicketList subOptions={subOptions} />
            </Paper>
            </ThemeProvider>
        );
};