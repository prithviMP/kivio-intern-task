# Kivio Internship Hiring Challenge - Conversational AI Avatar

This project was made by Sourashis Sarkar for the Kivio Internship Challenge.

## Objective
Use an AI tool to create a conversational avatar of a specified individual.

## Project Details
Made a simple conversational avatar AI app using Tkinter, which uses Llama to generate prompts based on the message, Google Text-to-Speech to convert the response into Audio, and Wav2Lip to convert the audio response into a video.

## Installation

### Pre-requisites
- Python 3.8 or higher
- Tkinter

### Installation Steps

Clone the repository:
```
git clone https://github.com/yourusername/yourproject.git
```

Navigate to the project directory:

```
cd yourproject
```

Install dependencies using pip:

```
pip install -r requirements.txt
```

Create a .env file in the root directory of the project:
```
# .env file

# Gooey API Key
GOOEY_API_KEY=your_gooey_api_key_here

# Llama API Key
LLAMA_API_KEY=your_llama_api_key_here
```
Replace your_gooey_api_key_here and your_llama_api_key_here with your actual API keys.

## Running the Project
To run the project, you should run the `app.py` file either manually or through bash.

```
python app.py
```

## Usage
To use the app, just type your message in the text box provided and press on the button. It will take some time to generate the response.

## Further Improvements
- Use speech to take the message input.
- Reduce the time taken to generate the response, audio, and video.
- Use better models for more perfection and human-like behaviour.
- Introduce non-text Avatar Interactions.
- Better UI


