import { Checkbox } from '@chakra-ui/react'
import React from 'react'

const IndeterminateCheckbox = ({
    indeterminate,
    ...props
}) => {
    const ref = React.useRef(null)
    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
          ref.current.isIndeterminate = !props.isChecked && indeterminate
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [ref, indeterminate])
  
    return (      
        <Checkbox
            ref={ref}
            isIndeterminate={indeterminate}
            {...props}
           
        />
  )
}

export default IndeterminateCheckbox