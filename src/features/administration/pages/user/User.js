import React from 'react'
import {useCheckAccess} from 'hooks';

const User = () => {
  const hasAccess = useCheckAccess({header_id:'administration',id:'users'})

  return (
    <div>User</div>
  )
}

export default User