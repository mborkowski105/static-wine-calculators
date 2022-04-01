import * as React from 'react'

class Ingredient extends React.Component {

    fieldStyles = {
        paddingLeft: 8
    }

    state = {
        name: "",
        percentage: 0
    }

    handleNameChange = (e)=>{
        let value = e.target.value
        this.setState({name: value})
        this.props.handleNameChange(value, this.props.index)
    }

    handlePercentageChange = (e)=>{
        let value = e.target.value
        this.setState({percentage: value})
        this.props.handlePercentageChange(value, this.props.index)
    }

    render(){
        return (
            <>
                <p style={this.fieldStyles}>
                    <p style={{color: "#663399"}}>Ingredient {this.props.index + 1}:</p>
                    <p>Name:</p>
                    <p><input type="text" onChange={this.handleNameChange} value={this.state.name}/></p>
                    <p>% out of batch (enter a number only): </p>
                    <p><input type="text" onChange={this.handlePercentageChange} value={this.state.percentage}/></p>
                </p>
            </>
        )
    }
}

export default Ingredient