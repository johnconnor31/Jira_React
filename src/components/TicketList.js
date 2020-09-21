import React from 'react';
import { Accordion as BaseAccordion, AccordionSummary as BaseAccordionSummary, AccordionDetails, Typography, TextField, IconButton, 
        FormControl, InputLabel, Select, MenuItem, FormControlLabel} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, withStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme =>({
    root: {
        margin: '50px 0 0 0',
        backgroundColor: '#f5f5f5',
        padding: '10px'
    },
    summaryHeader: {
        margin: '0 50px 0 0'
    },
    summaryText: {
        color: theme.palette.text.secondary
    },
    ticketDetail: {
            width: '70%'
    },
    ticketDescription: {
        width: '100%'
    },
    ticketActions: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    StatusText: {
        width: '11rem',
        margin: '10px'
    },
    AssigneeText: {
        width: '11rem',
        margin: '10px'
    },
    formLabel: {
        color: theme.palette.primary.main
    }
}));

const Accordion = withStyles({
    root: {
    border: '0.5px solid rgba(0, 0, 0, .125)',
    '&:not(:last-child)': {
        borderBottom: 0
    },
    boxShadow: 'none',
    '&$expanded': {
      margin: 'auto',
    }
    },
    expanded: {}
})(BaseAccordion);

const AccordionSummary = withStyles({
    root: {
        borderBottom: '0.5px solid rgba(0,0,0, 0.125)',
        minHeight: '60px'
    }
})(BaseAccordionSummary);

export default function TicketList(props) {
    const classes = useStyles();
    const filters = props.subOptions;
    const [expanded, setExpanded] = React.useState('');
    const [editDescription, setEditDescription] = React.useState(false);
    const [status, statusChange] = React.useState(1);
    const changeAccordion = accordionId => (e, isExpanded) => {
        setExpanded(isExpanded && accordionId); 
        setEditDescription(false);
    }
    const sampleText = `Hello darkness my old friend. I have come to meet you again.
    It doesnt matter what we are, what matters is our plan. 
    Well, congratulations, you got urself caught. whats the next step of your master plan?
    CRASHING this PLANE. With NO survivors!
    Hello darkness my old friend. I have come to meet you again.
    It doesnt matter what we are, what matters is our plan. 
    Well, congratulations, you got urself caught. whats the next step of your master plan?
    CRASHING this PLANE. With NO survivors!
    Hello darkness my old friend. I have come to meet you again.
    It doesnt matter what we are, what matters is our plan. 
    Well, congratulations, you got urself caught. whats the next step of your master plan?
    CRASHING this PLANE. With NO survivors!
    Hello darkness my old friend. I have come to meet you again.
    It doesnt matter what we are, what matters is our plan. 
    Well, congratulations, you got urself caught. whats the next step of your master plan?
    CRASHING this PLANE. With NO survivors!

    Hello darkness my old friend. I have come to meet you again.
    It doesnt matter what we are, what matters is our plan. 
    Well, congratulations, you got urself caught. whats the next step of your master plan?
    CRASHING this PLANE. With NO survivors!`;
    const issueList = [{
        name: 'issue1',
        title: 'UI not working properly'
    },
    {
        name: 'issue2',
        title: 'API not working properly'
    },{
        name: 'issue3',
        title: 'Network failure'
    },{
        name: 'issue4',
        title: 'Latency'
    }];
    return (
        <div className={classes.root}>
        {issueList.map(issue => <Accordion expanded={expanded===issue.name} onChange={changeAccordion(issue.name)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.summaryHeader}>{issue.name}</Typography>
                <Typography className={classes.summaryText}>{issue.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.ticketDetail}>
                {editDescription ? 
                <>
                    <TextField
                    classes={{root: classes.ticketDescription}}
                    multiline
                    variant='outlined'
                    label={<div className={classes.formLabel}>Description</div> }
                    defaultValue={sampleText}>
                    </TextField>
                    <IconButton onClick={() => setEditDescription(false)}>
                        <DoneIcon />
                    </IconButton>
                    <IconButton onClick={() => setEditDescription(false)}>
                        <CloseIcon />
                    </IconButton>
                </>
                :<Typography classes={{root: classes.ticketDescription}} align='left' gutterBottom onClick={() => setEditDescription(true)}>
                    {sampleText} 
                </Typography>
                }
                </div>
                <div className={classes.ticketActions}>
                    <FormControl variant='outlined' classes={{root: classes.StatusText}}>
                    <InputLabel id='statusLabel' classes={{root:classes.formLabel}}>Status</InputLabel>
                    <Select
                        labelId='statusLabel'
                        label='Status'
                        IconComponent='div'
                        value={status}
                        onChange={(e) => statusChange(e.target.value)}>
                            <MenuItem value="1">Open</MenuItem>
                            <MenuItem value="2">In Progress</MenuItem>
                            <MenuItem value="3">In Code Review</MenuItem>
                            <MenuItem value="4">Resolved</MenuItem>
                            <MenuItem value="5">Closed</MenuItem>
                        </Select>
                    </FormControl>
                    <Autocomplete
                    disableClearable
                    forcePopupIcon={false}
                    options = {['Sairam', 'Ramya', 'Elon Musk', 'Jeff Bezos the fourth']}
                    renderInput = {(params) => <TextField
                                                    classes = {{root: classes.AssigneeText}}
                                                    {...params} 
                                                    variant='outlined' 
                                                    label={<div className={classes.formLabel}>Reporter</div>} />} 
                    />
                    <Autocomplete
                    disableClearable
                    forcePopupIcon={false}
                    options = {['UI', 'API', 'Middleware', 'DevOps']}
                    renderInput = {(params) => <TextField
                                                    classes = {{root: classes.AssigneeText}}
                                                    {...params} 
                                                    variant='outlined' 
                    label={<div className={classes.formLabel}>Functional Team</div>} />} 
                    />
                    <Autocomplete
                    disableClearable
                    forcePopupIcon={false}
                    options = {['2020.1', '2020.2', '2020.3']}
                    renderInput = {(params) => <TextField
                                                    classes = {{root: classes.AssigneeText}}
                                                    {...params} 
                                                    variant='outlined' 
                    label={<div className={classes.formLabel}>Fix Version</div>} />} 
                    />
                    <Autocomplete
                    disableClearable
                    forcePopupIcon={false}
                    options = {['my label']}
                    renderInput = {(params) => <TextField
                                                    classes = {{root: classes.AssigneeText}}
                                                    {...params} 
                                                    variant='outlined' 
                    label={<div className={classes.formLabel}>Label/s</div>} />} 
                    />
                </div>
            </AccordionDetails>
        </Accordion>)
        }
        </div>
    );
}