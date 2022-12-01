import React from 'react'
import {Box,Input} from '@chakra-ui/react';

const DebounceInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}) => {
    const [value, setValue] = React.useState(initialValue)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(()=>{
        const timeout = setTimeout(()=>{
            onChange(value)
        },debounce)

        return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value])

    return (
        <Box width={'sm'}>    
            <Input size='xs' placeholder='Search' value={value} onChange={e => setValue(e.target.value)} {...props}/>
        </Box>
    )
}

export default DebounceInput