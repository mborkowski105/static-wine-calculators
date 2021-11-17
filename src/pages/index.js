import * as React from "react"


class IndexPage extends React.Component {

  // styles
  pageStyles = {
    color: "#232129",
    padding: 96,
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
  }
  headingStyles = {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
  }
  headingAccentStyles = {
    color: "#663399",
  }
  paragraphStyles = {
    marginBottom: 48,
  }
  codeStyles = {
    color: "#8A6534",
    padding: 4,
    backgroundColor: "#FFF4DB",
    fontSize: "1.25rem",
    borderRadius: 4,
  }
  listStyles = {
    marginBottom: 96,
    paddingLeft: 0,
  }
  listItemStyles = {
    fontWeight: 300,
    fontSize: 24,
    maxWidth: 560,
    marginBottom: 30,
  }

  linkStyle = {
    color: "#8954A8",
    fontWeight: "bold",
    fontSize: 16,
    verticalAlign: "5%",
  }

  descriptionStyle = {
    color: "#232129",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 0,
    lineHeight: 1.25,
  }

  badgeStyle = {
    color: "#fff",
    backgroundColor: "#088413",
    border: "1px solid #088413",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    borderRadius: 4,
    padding: "4px 6px",
    display: "inline-block",
    position: "relative",
    top: -2,
    marginLeft: 10,
    lineHeight: 1,
  }

  // data
  links = []

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
      <main style={this.pageStyles}>
        <title>Wine Calculators | Matt Borkowski</title>
        <h1 style={this.headingStyles}>
          Wine Calculators
          <br />
          <span style={this.headingAccentStyles}>— made incredibly easy, fast, convenient. </span>
        </h1>
        <p style={this.paragraphStyles}>
        <p>Input the info below: </p>
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
        </p>
        <p>I suggest you add <span id="result_element" style={this.codeStyles}>{this.state.sulfiteResult}</span> mL of diluted, 10% concentration SO2 solution, or <span id="kmbs_element" style={this.codeStyles}>{this.state.kmbsResult}</span> grams of KMBS to your wine.</p>
      </main>
    )
  }
}

export default IndexPage
