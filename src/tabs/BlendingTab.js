import * as React from "react"
import Ingredient from '../components/WineBlendIngredient'

class BlendingTab extends React.Component {
    formContainerStyles = {
        paddingLeft: 12,
        fontSize: 18,
        display: 'flex',
    }

    individualWineFormStyles = {
        width: '50%'
    }

    fieldStyles = {
        marginLeft: 24
    }

    codeStyles = {
        color: "#8A6534",
        padding: 4,
        backgroundColor: "#FFF4DB",
        fontSize: "1.25rem",
        borderRadius: 4,
    }

    remainingDistributionHeaderStyles = {
        fontSize: 18
    }

    remainingDistributionStyles = {
        fontWeight: "bold",
        fontSize: 24
    }

    state = {
        wine1Quantity: 0,
        wine1RemainingDistribution: 100,
        wine1Ingredients: [],
        wine2Quantity: 0,
        wine2RemainingDistribution: 100,
        wine2Ingredients: [],
        results: {}
    }

    addWine1Ingredient = ()=>{
        let newIngredient = {name: "", percentage: ""}
        this.setState({wine1Ingredients: [...this.state.wine1Ingredients, newIngredient]})
    }

    addWine2Ingredient = ()=>{
        let newIngredient = {name: "", percentage: ""}
        this.setState({wine2Ingredients: [...this.state.wine2Ingredients, newIngredient]})
    }

    renderWine1Ingredents = ()=>{
        return this.state.wine1Ingredients.map((ingredient, i)=>{
            return (
                <Ingredient 
                    index={i} 
                    name={ingredient.name} 
                    percentage={ingredient.percentage}
                    handleNameChange = {this.handleWine1IngredientNameChange}
                    handlePercentageChange = {this.handleWine1IngredientPercentageChange}  
                    />
            )
        })
    }

    renderWine2Ingredents = ()=>{
        return this.state.wine2Ingredients.map((ingredient, i)=>{
            return (
                <Ingredient 
                    index={i} 
                    name={ingredient.name} 
                    percentage={ingredient.percentage}
                    handleNameChange = {this.handleWine2IngredientNameChange}
                    handlePercentageChange = {this.handleWine2IngredientPercentageChange}  
                />
            )
        })
    }

    handleWine1IngredientNameChange = (value, index)=>{
        let arrayCopy = [...this.state.wine1Ingredients]
        arrayCopy[index].name = value
        this.setState({wine1Ingredients: [...arrayCopy]})
    }

    handleWine2IngredientNameChange = (value, index)=>{
        let arrayCopy = [...this.state.wine2Ingredients]
        arrayCopy[index].name = value
        this.setState({wine2Ingredients: [...arrayCopy]})
    }

    handleWine1IngredientPercentageChange = (value, index)=>{
        let arrayCopy = [...this.state.wine1Ingredients]
        arrayCopy[index].percentage = value
        this.setState({wine1Ingredients: [...arrayCopy]})
    }

    handleWine2IngredientPercentageChange = (value, index)=>{
        let arrayCopy = [...this.state.wine2Ingredients]
        arrayCopy[index].percentage = value
        this.setState({wine2Ingredients: [...arrayCopy]})
    }

    calculateResult = ()=>{
        //add up total wine after 2 wines are blended/added together to get total quantity
        let totalQuantity = parseInt(this.state.wine1Quantity) + parseInt(this.state.wine2Quantity)
        console.log(totalQuantity)

        //go through 1st list of wines, figuring out how much volume is represented by each percentage of total 1st batch
        //create dictionary of name=>individualQuantity key/value associations for easy lookup
        let ingredientsMap1 = {}  
        this.state.wine1Ingredients.forEach((ingredient)=>{
            let name = ingredient.name
            let ingredientQuantity = this.state.wine1Quantity * (parseInt(ingredient.percentage) / 100)
            //temporarily record value as volume, to convert back to percentage later
            ingredientsMap1[name] = ingredientQuantity
        })

        //create 2nd dictionary for 2nd wine
        let ingredientsMap2 = {}      
        this.state.wine2Ingredients.forEach((ingredient)=>{
            let name = ingredient.name
            let ingredientQuantity = this.state.wine2Quantity * (parseInt(ingredient.percentage) / 100)
            //temporarily record value as volume, to convert back to percentage later
            ingredientsMap2[name] = ingredientQuantity
        })

        //create 3rd dictionary, just for unique ingredients
        let uniqueIngredientsMap = {}
        // go through ingredients of wine 1, seeing if they are in wine2
        for (let name in ingredientsMap1){
            let percentage = 0
            let quantity1 = ingredientsMap1[name]
            // if both wines share the same ingredient
            if (ingredientsMap2.hasOwnProperty(name)){
                let quantity2 = ingredientsMap2[name]
                let individualQuantity = quantity1 + quantity2
                percentage = ((individualQuantity / totalQuantity) * 100)
            }
            // if ingredient is unique to wine1
            else {
                percentage = (quantity1 / totalQuantity) * 100
            }
            uniqueIngredientsMap[name] = percentage
        }

        //still need to go through ingredients of wine 2, but now compare them to unique Ingredients Map to make sure they're not being recorded twice
        for (let name in ingredientsMap2){
            let percentage = 0
            let quantity2 = ingredientsMap2[name]
            //only record ingredient if it hasn't already been recorded
            if (!(uniqueIngredientsMap.hasOwnProperty(name))){
                percentage = (quantity2 / totalQuantity) * 100
                uniqueIngredientsMap[name] = percentage
            }
        }

        this.setState({results: uniqueIngredientsMap})
    }

    renderResults = ()=>{
        if (Object.keys(this.state.results).length > 0){
            return Object.keys(this.state.results).map((key)=>{
                return (
                    <li>{key}: {this.state.results[key]}%</li>  
                )
            })
        }
        else {
            return null
        }
    }

    render(){
        return (
            <>
                <p>Input the first wine's ingredients by percentage below: </p>
                <div style={this.formContainerStyles}>
                    <div style={this.individualWineFormStyles}>
                    <p style={this.remainingDistributionHeaderStyles}>Remaining percentage of 1st wine: <span style={this.remainingDistributionStyles}>{this.state.wine1RemainingDistribution}%</span></p>
                        <p>
                            Total gallons of 1st wine:
                            <input type="text" 
                                style={this.fieldStyles} 
                                value={this.state.wine1Quantity}
                                onChange={(e)=>this.setState({wine1Quantity: e.target.value})}
                            />
                        </p>
                        <p>
                            Ingredients/ Components: {this.renderWine1Ingredents()}
                        </p>
                        <button onClick={this.addWine1Ingredient}>+ Add an ingredient</button>
                    </div>  
                    <div style={this.individualWineFormStyles}>
                    <p style={this.remainingDistributionHeaderStyles}>Remaining percentage of 2nd wine: <span style={this.remainingDistributionStyles}>{this.state.wine2RemainingDistribution}%</span></p>
                        <p>
                            Total gallons of 2nd wine:
                            <input type="text" 
                                style={this.fieldStyles} 
                                value={this.state.wine2Quantity} 
                                onChange={(e)=>this.setState({wine2Quantity: e.target.value})}
                            />
                        </p>
                        <p>
                            Ingredients/ Components: {this.renderWine2Ingredents()}
                        </p>
                        <button onClick={this.addWine2Ingredient}>+ Add an ingredient</button>
                    </div> 
                </div>   
                <p><button onClick={this.calculateResult}>Calculate final result</button></p>
                <p>
                    <ul>
                        {this.renderResults()}
                    </ul>
                </p>          
            </>
        )
    }
}

export default BlendingTab