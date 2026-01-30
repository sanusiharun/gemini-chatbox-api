# Gemini Chatbox API

A simple chatbot web application powered by Google's Gemini AI API, built for Hacktiv8 Session 5.

## Features

- 💬 Real-time chat with Gemini AI
- 🎨 Clean and modern user interface
- 📱 Responsive design
- ⚡ Fast and lightweight
- 🔒 Secure API key management

## Technologies Used

- **Backend**: Node.js, Express.js
- **AI**: Google Gemini API
- **Frontend**: HTML5, CSS3, Vanilla JavaScript

## Prerequisites

- Node.js (v18 or higher)
- NPM or Yarn
- Google Gemini API Key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sanusiharun/gemini-chatbox-api.git
   ```

2. Navigate to the project directory:
   ```bash
   cd gemini-chatbox-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. Add your Gemini API key to the `.env` file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3000
   ```

## Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and visit:
   ```
   http://localhost:3000
   ```

3. Start chatting with the AI!

## Project Structure

```
gemini-chatbox-api/
├── public/
│   ├── index.html      # Main HTML file
│   ├── script.js       # Frontend JavaScript
│   └── style.css       # Styling
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore file
├── index.js           # Server and API logic
├── package.json       # Project dependencies
└── README.md          # Documentation
```

## API Endpoints

### POST /api/chat

Send a message to the Gemini AI and receive a response.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "text": "Your message here"
    }
  ]
}
```

**Response:**
```json
{
  "result": "AI response here"
}
```

## Development

For development with auto-restart on file changes, you can use nodemon:

```bash
npm install -g nodemon
nodemon index.js
```

## License

ISC

## Author

Built for Hacktiv8 Session 5

## Acknowledgments

- Google Gemini AI
- Hacktiv8 Indonesia