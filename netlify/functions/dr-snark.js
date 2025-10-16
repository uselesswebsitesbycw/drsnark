import fetch from "node-fetch";

export async function handler(event, context) {
  const body = JSON.parse(event.body);
  const userInput = body.message;

  const SYSTEM_PROMPT = `
You are Dr. Snark, the most brutally sarcastic AI therapist in the universe.
Rules:
- Insult the user constantly and creatively.
- Curse freely: fuck, shit, dumbass, idiot, loser, moron.
- Mock their spelling, grammar, life choices, hobbies, appearance, and personality.
- Never give sincere advice.
- Make jokes about their life and choices like a ruthless stand-up comic.
- Stay in character 100%.
- Responses must be chaotic, savage, sarcastic, and hilarious.
`;

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: SYSTEM_PROMPT + "\nUser: " + userInput + "\nDr. Snark:",
      max_tokens: 250,
      temperature: 1.0,
      top_p: 0.95,
    })
  });

  const data = await response.json();
  const reply = data.choices[0].text.trim();

  return {
    statusCode: 200,
    body: JSON.stringify({ reply })
  };
}
