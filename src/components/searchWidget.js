import React from 'react';
import { TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns';
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

export default function SearchWidget(props) {
    const styles = useStyles();
    const [selectedOptions, setSelectedOptions] = React.useState([options[0]]);
    const { subOptions, setSubOptions } = props;
    const cloneSubOptions = values => {
        const subOptCopy = Object.assign([],values);
        setSubOptions(subOptCopy);
    }
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
            subOptions,
            cloneSubOptions,
            variant:'outlined',
            component: ChipWithTextBox
        }} />
    );
}

function ChipWithTextBox(props) {
    const selectedOption = props.selectedOptions[props['data-tag-index']];
    const { subOptions, cloneSubOptions } = props;
    const type = selectedOption.type;
    const name = selectedOption.name;
    const optionsList = selectedOption.opts;
    const styles = useStyles();
    const textRef = React.useRef();
    function onTextClick(e) {
        console.log('stopping propagation');
        e.stopPropagation();
        e.preventDefault();
        textRef.current.focus();
    }
    const currentValID = subOptions.findIndex(val => val.name === name);
    console.log('chip props',subOptions);
    const changeValues = name => (event,values) => {
        // console.log('on change', values, subOptions, name);
        if(currentValID!==-1){
            subOptions.splice(currentValID,1, {
                name,
                values: typeof event.getMonth === 'function' ? event : values
            });
        } else {
            subOptions.push({
                name,
                values: typeof event.getMonth === 'function' ? event : values
            });
        }
        cloneSubOptions(subOptions);
    } 
    const selectOptions = !type ? <Autocomplete
                            id='cardSearch'
                            multiple
                            filterSelectedOptions
                            options = {optionsList}
                            onChange={changeValues(selectedOption.name)}
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
                            />
                            : <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    variant='inline'
                                    autoOk
                                    format="MM/dd/yyyy"
                                    animateYearScrolling
                                    value={currentValID===-1 ? new Date() : subOptions[currentValID].values}
                                    onChange={changeValues(selectedOption.name)}
                                    InputAdornmentProps={{
                                        position:'start'
                                    }}
                                    InputProps={{
                                        disableUnderline:true
                                    }}
                                    KeyboardButtonProps={{
                                        color:'primary'
                                    }}
                                    />
                            </MuiPickersUtilsProvider>;
    const childs = Object.assign([],[props.children[0],props.children[1],':',selectOptions,props.children[2]]);

    return (
        <>
        <div className={props.className} onClick={onTextClick} onKeyDown={onTextClick}>
            {childs}
        </div>
        </>
    );
}
