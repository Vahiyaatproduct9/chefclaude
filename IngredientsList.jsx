export default function IngredientsList(props) {
    function Heading() {
        if (props.List.length) {
            return (
                <h2>Ingredients on Hand:</h2>

            )
        }
    }
    return (
        <>
            <Heading />
            <ul className="ul">
                {props.List.map(x => (<li key={x}>{x}</li>))}
            </ul>
            <div className="footer" style={props.List.length > 2 ? { animationName: 'down' } : {}}>
                <section><h2>Ready for a Recipe?</h2>
                    <button onClick={props.getRecipe}>Get a Recipe</button>
                </section>
                <br />
                <p>Generate a recipe from your list of ingredients.</p>
            </div>
        </>
    )
}