import { useState } from 'react';
import axios from 'axios';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [prompt, setPrompt] = useState('');
	const [response, setResponse] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		// Send a request to the server with the prompt
		console.log(prompt);

		axios
			.post('/api/chat', { prompt })
			.then((res) => {
				// Update the response state with the server's response
				console.log(res.data);
				setResponse(res.data.response);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<main
			className={`flex flex-col items-center justify-between p-16 ${inter.className}`}
		>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<input
					className="border border-gray-300 rounded px-4 py-2 mb-2 text-black"
					type="text"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<button
					disabled={prompt === ''}
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
					type="submit"
				>
					Submit
				</button>
			</form>
			{response && <p className="mt-4">{response}</p>}
		</main>
	);
}
