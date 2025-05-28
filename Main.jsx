import React from "react"
import ClaudeRecipe from "./sampledata"
import IngredientsList from "./IngredientsList"
import { getRecipeFromOpenRouter } from "./ai"

export default function Main() {
    const [List, setList] = React.useState([])

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        if (newIngredient.trim() !== "") {
            if (!List.includes(newIngredient)) {
                setList(prev => [...prev, newIngredient])
            }
            else {
                window.alert("You can't input the same Item!")
            }

        }
        else {
            window.alert("Items cannot be empty!")
        }
        document.querySelector('form').reset()
    }
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromOpenRouter(List)
        setRecipe(recipeMarkdown)
    }

    return (
        <main>
            <form className="add-ingredient-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    aria-label="Add Ingredient"
                    placeholder="e.g Rice"
                    name="ingredient"
                />
                <button>+ Add Item</button>
                <br />
            </form>
            <IngredientsList List={List} getRecipe={getRecipe} />
            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main >
    )
}