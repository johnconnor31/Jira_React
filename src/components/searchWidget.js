import React from 'react';
import { TextField, Input } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '2rem'
    },
    innerTextField: {
        minWidth: '10rem'
    }
}));

export default function SearchWidget() {
    const styles = useStyles();
    return (
        <Autocomplete
        className={styles.root} 
        id = 'search-widget'
        multiple
        filterSelectedOptions
        options={options}
        defaultValue={[options[0]]}
        getOptionLabel = {o => o.name}
        renderInput={params => {
            return <TextField id='searchTextField' variant='outlined' {...params} />
        }}
        ChipProps= {{
            variant:'outlined',
            component: ChipWithTextBox
        }} />
    );
}

function ChipWithTextBox(props) {
    const styles = useStyles();
    const textRef = React.useRef();
    console.log('chip props', props);
    function onTextClick(e) {
        e.stopPropagation();
        e.preventDefault();
        textRef.current.focus();
    }
    const selectOptions = <Autocomplete 
                            id='cardSearch'
                            multiple
                            options = {options[props['data-tag-index']].opts}
                            renderInput = {params => <TextField
                                                        {...params}
                                                        ref={textRef}
                                                        id='innerSearch'
                                                        className={styles.innerTextField}
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            disableUnderline:true
                                                        }}
                                                        fullWidth
                                                        autoFocus
                                                        />
                                        }
                            />;
    const childs = Object.assign([],[props.children[0],props.children[1],':',selectOptions,props.children[2]]);

    return (
        <>
        <div className={props.className} onClick={onTextClick}>
            {childs}
        </div>
        </>
    );
}

const options = [
    { name:'Assignee', opts: [
        'Sai',
        'ramya']
    },
    { name: 'reporter', opts: [
        'Sai',
        'ramya']
    },
    { name: 'updatedDate',opts: [
        'Sai',
        'ramya']
    },
    { name: 'createdDate',opts: [
        'Sai',
        'ramya']
    },
    { name: 'status',opts: [
        'Sai',
        'ramya']
    },
];