import React from 'react'
//this WILL NOT be rendered to the page, this is just an example for syntax
export default class Stateful extends React.Component {
    constructor(){
    super()
    this.state = {
        name: 'Julia'
    }
    }
    render() {
        return (
            <div className="section about">
                My name is {this.state.name}<br />
                and I like {this.props.data}<br />
                This is a stateful component!!
            </div>
        )
    }
}