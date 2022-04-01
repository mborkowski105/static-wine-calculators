import * as React from "react"

class SulfiteTab extends React.Component {
    fieldStyles = {
        paddingLeft: 12,
        paddingBottom: 2,
        paddingTop: 1
    }

    codeStyles = {
        color: "#8A6534",
        padding: 4,
        backgroundColor: "#FFF4DB",
        fontSize: "1.25rem",
        borderRadius: 4,
    }

    state = {
        gallonsOfWineInput: "",
        so2DilutedSolutionVolume: "",
        sulfiteResult: "",
        kmbsResult: ""
    }

    handleGallonsOfWineInputChange = (e)=>{
        this.setState({ gallonsOfWineInput: e.target.value})
    }

    handleSo2DilutedSolutionVolumeChange = (e)=>{
        this.setState({ so2DilutedSolutionVolume: e.target.value})
    }

    calculateSulfiteAddition = (e)=>{
        e.preventDefault()
        let wineVolume = parseFloat(this.state.gallonsOfWineInput)
        let so2PartsPerMillion = parseFloat(this.state.so2DilutedSolutionVolume)

        let so2DilutedSolutionVolume = 0.0378536 * wineVolume * so2PartsPerMillion
        let kmbs = (0.006571875 * wineVolume * so2PartsPerMillion).toString()

        this.setState({ sulfiteResult: so2DilutedSolutionVolume.toString(), kmbsResult: kmbs})
    }

    render(){
        return (
            <>
                <p>Input the info below: </p>
                <div style={this.fieldStyles}>
                    <p>
                        Gallons of wine:
                        <input type="text" onChange={this.handleGallonsOfWineInputChange} value={this.state.gallonsOfWineInput} id="wine_volume_input_field" />
                    </p>
                    <p>
                        ppm (parts per million) of SO2 addition:
                        <input type="text" onChange={this.handleSo2DilutedSolutionVolumeChange} value={this.state.so2DilutedSolutionVolume} id="wine_volume_input_field" />
                    </p>
                    <p>
                        <input type="button" value="Calculate" onClick={this.calculateSulfiteAddition}/>
                    </p>
                </div>
                <p>I suggest you add <span id="result_element" style={this.codeStyles}>{this.state.sulfiteResult}</span> mL of diluted, 10% concentration SO2 solution, or <span id="kmbs_element" style={this.codeStyles}>{this.state.kmbsResult}</span> grams of KMBS to your wine.</p>
            </>
        )
    }
}

export default SulfiteTab