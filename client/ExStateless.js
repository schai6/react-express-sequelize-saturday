import React from 'react'
//this WILL NOT be rendered to the page, this is just an example for syntax

const UserInfo = props => {
    console.log(props)
    const {puppies} = props
    return (
        <div className="section info">
            I am stateless. I recieve props
            This is my puppy prop: {puppies}
        </div>
    )
}

export default UserInfo