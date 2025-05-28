import Markdown from "react-markdown"
export default function ClaudeRecipe(props) {

    return (
        <>
            <h1>Chef Claude says:</h1>
            <section>
                <Markdown>{props.recipe}</Markdown>
            </section>

        </>
    )
}