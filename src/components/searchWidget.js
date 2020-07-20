import React from 'react';
import { TextField, Input } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import options from '../static/filters_mock.json';

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
    const [selectedOptions, setSelectedOptions] = React.useState([options[0]]);
    const [selectedSubOptions, setSelectedSubOptions] = React.useState([]);
    function onChangeValues(e, values){
        setSelectedOptions(values);
    }
    return (
        <Autocomplete
        className={styles.root} 
        id = 'search-widget'
        multiple
        filterSelectedOptions
        options={options}
        defaultValue={[options[0]]}
        getOptionLabel = {o => o.name}
        onChange={onChangeValues}
        renderInput={params => {
            return <TextField id='searchTextField' variant='outlined' {...params} />
        }}
        ChipProps= {{
            selectedOptions,
            variant:'outlined',
            component: ChipWithTextBox
        }} />
    );
}

function ChipWithTextBox(props) {
    const optionsList = props.selectedOptions[props['data-tag-index']].opts;
    const styles = useStyles();
    const textRef = React.useRef();
    console.log('chip props', props);
    function onTextClick(e) {
        console.log('stopping propagation');
        e.stopPropagation();
        e.preventDefault();
        textRef.current.focus();
    }
    const selectOptions = <Autocomplete
    id='cardSearch'
                            multiple
                            filterSelectedOptions
                            options = {optionsList}
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
        <div className={props.className} onClick={onTextClick} onKeyDown={onTextClick}>
            {childs}
        </div>
        </>
    );
}
