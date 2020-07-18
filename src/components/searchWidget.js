import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

export default function SearchWidget() {
    return (
        <Autocomplete 
        id = 'search-widget'
        multiple
        filterSelectedOptions
        options={options}
        defaultValue={[options[0]]} 
        renderInput={params => {
            return <TextField id='searchTextField' variant='outlined' {...params} />
        }}/>
    );
}

const options = [
    'Assignee',
    'reporter',
    'updatedDate',
    'createdDate',
    'status'
];