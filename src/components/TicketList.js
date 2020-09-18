import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    }
}));

export default function TicketList(props) {
    const classes = useStyles();
    const filters = props.subOptions;
    const [expanded, setExpanded] = React.useState('');
    const changeAccordion = accordionId => (e, isExpanded) => setExpanded(isExpanded && accordionId); 
    return (
        <div className={classes.root}>
        <Accordion expanded={expanded==='issue1'} onChange={changeAccordion('issue1')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.summaryHeader}>Issue1</Typography>
                <Typography className={classes.summaryText}>World Hunger</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Hello darkness my old friend. I have come to meet you again.
                    It doesn't matter what we are, what matters is our plan. 
                    Well, congratulations, you got urself caught. whats the next step of your master plan?
                    CRASHING this PLANE. With NO survivors!
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded==='issue3'} onChange={changeAccordion('issue3')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.summaryHeader}>Issue3</Typography>
                <Typography className={classes.summaryText}>Corona Virus</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Hello darkness my old friend. I have come to meet you again.
                    It doesn't matter what we are, what matters is our plan. 
                    Well, congratulations, you got urself caught. whats the next step of your master plan?
                    CRASHING this PLANE. With NO survivors!
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded==='issue4'} onChange={changeAccordion('issue4')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.summaryHeader}>Issue4</Typography>
                <Typography className={classes.summaryText}>Dictatorship</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Hello darkness my old friend. I have come to meet you again.
                    It doesn't matter what we are, what matters is our plan. 
                    Well, congratulations, you got urself caught. whats the next step of your master plan?
                    CRASHING this PLANE. With NO survivors!
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded==='issue2'} onChange={changeAccordion('issue2')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.summaryHeader}>Issue2</Typography>
                <Typography className={classes.summaryText}>Poverty</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Hello darkness my old friend. I have come to meet you again.
                    It doesn't matter what we are, what matters is our plan. 
                    Well, congratulations, you got urself caught. whats the next step of your master plan?
                    CRASHING this PLANE. With NO survivors!
                </Typography>
            </AccordionDetails>
        </Accordion>
        </div>
    );
}