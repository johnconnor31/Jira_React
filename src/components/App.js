import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
                main: mode ==='dark' ? '#002f' : '#f44336'
              },
            type:mode
        }
    });
        return(
            <ThemeProvider theme={theme}>
            <Paper variant='outlined'>
                <Header switchMode={switchMode} />
                <SearchWidget subOptions={subOptions} setSubOptions={setSubOptions} />
            </Paper>
            <TicketList subOptions={subOptions} />
            </ThemeProvider>
        );
};