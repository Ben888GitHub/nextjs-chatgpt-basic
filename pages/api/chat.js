const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.SIMPLICITY_OF_DEV
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(405).end();
		return;
	}

	// Get the prompt from the request body
	const { prompt } = req.body;

	console.log(prompt);

	try {
		// Generate a response with ChatGPT
		const completion = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `${prompt}\n\nAnswer:`,
			max_tokens: 100,
			temperature: 0.7
		});
		const answer = completion.data.choices[0].text.trim();
		res.status(200).json({ response: answer });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: 'An error occurred' });
	}
}
