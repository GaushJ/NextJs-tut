import React from 'react'

const UserProfile = ({ params }: any) => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            User id is: {params.userId}
        </div>
    )
}

export default UserProfile