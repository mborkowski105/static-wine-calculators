import * as React from "react"
import SulfiteTab from '../tabs/SulfiteTab'
import BlendingTab from '../tabs/BlendingTab' 

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
    width: 1080,
    border: '1px solid #e5e7e8',
    backgroundColor: '#f6f8fa',
    paddingTop: 8,
    paddingLeft: 18,
    paddingBottom: 18
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

  navStyles = {
    display: 'flex',
    gap: 8,
    paddingLeft: 36,
    paddingBottom: 18
  }

  navItemStyleOne = {
    backgroundColor: "#24292f",
    color: "#f6f8fa",
    fontWeight: "bold",
    padding: 10,
    fontSize: 18
  }

  navItemStyleTwo = {
    backgroundColor: "#e5e7e8",
    color: "#57606a",
    fontWeight: "bold",
    padding: 10,
    fontSize: 18
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
    sulfite: true
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
        <nav style={this.navStyles}>
          <button style={this.navItemStyleOne} onClick={()=>{this.setState({sulfite: true})}}>Sulfite</button>
          <button style={this.navItemStyleTwo} onClick={()=>{this.setState({sulfite: false})}}>Blending</button>
        </nav>
        <p style={this.paragraphStyles}>
          { this.state.sulfite ? <SulfiteTab/> : <BlendingTab /> }
          <div/>
        </p>
      </main>
    )
  }
}

export default IndexPage