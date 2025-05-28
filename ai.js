const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe the user could make with some or all of those ingredients. You don't need to use every ingredient they mention. The recipe can include a few extra ingredients. Format your response in markdown for easy webpage rendering.
`

const API_KEY = import.meta.env.VITE_CHEF_CLAUDE_API;
console.log(API_KEY)
const MODEL_ID = "mistralai/mistral-7b-instruct"

export async function getRecipeFromOpenRouter(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://vahiyaatproduct9.github.io/chefclaude", // change if deployed
                "X-Title": "MyReactRecipeBot"
            },
            body: JSON.stringify({
                model: MODEL_ID,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
                ],
                max_tokens: 1024
            })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "No response from model.";
    } catch (err) {
        console.error("Error:", err.message);
        return "Error generating recipe.";
    }
}
