# from google.cloud import texttospeech
# import os
# import replicate 

# # Instantiate a client
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "instant-voyager-424107-n8-135516f63c8b.json"
# client = texttospeech.TextToSpeechClient()

# # Set the text input to be synthesized
# synthesis_input = texttospeech.SynthesisInput(text="Heyy, I am an AI Avatar.")

# # Build the voice request, select the language and the voice gender
# voice = texttospeech.VoiceSelectionParams(
#     language_code="en-in", ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
# )

# # Select the type of audio file you want returned
# audio_config = texttospeech.AudioConfig(
#     audio_encoding=texttospeech.AudioEncoding.MP3
# )

# # Perform the text-to-speech request
# response = client.synthesize_speech(
#     input=synthesis_input, voice=voice, audio_config=audio_config
# )

# # Save the synthesized speech as an audio file
# with open("output.mp3", "wb") as out:
#     out.write(response.audio_content)
#     print('Audio content written to file "output.mp3"')
import os
from google.cloud import texttospeech, speech
import torch
from transformers import LLaMAForCausalLM, LLaMATokenizer

# Set up Google Cloud credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "instant-voyager-424107-n8-135516f63c8b.json"

# Initialize Text-to-Speech client
tts_client = texttospeech.TextToSpeechClient()

# Initialize Speech-to-Text client
stt_client = speech.SpeechClient()

# Load LLaMA model and tokenizer
model = LLaMAForCausalLM.from_pretrained("path/to/llama/model")
tokenizer = LLaMATokenizer.from_pretrained("path/to/llama/tokenizer")

# Define function to generate AI response
def generate_response(prompt):
    input_ids = tokenizer.encode(prompt, return_tensors="pt")
    output = model.generate(input_ids, max_length=1024, do_sample=True, top_k=50, top_p=0.95, num_return_sequences=1)
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    return response

# Main conversational loop
while True:
    # Capture user input using Speech-to-Text
    audio_config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
    )
    audio = speech.RecognitionAudio(content=None)

    print("Listening...")
    response = stt_client.recognize(config=audio_config, audio=audio)
    user_input = " ".join([result.alternatives[0].transcript for result in response.results])

    # Generate AI response using LLaMA
    ai_response = generate_response(user_input)

    # Convert AI response to speech using Text-to-Speech
    synthesis_input = texttospeech.SynthesisInput(text=ai_response)
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
    )
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.LINEAR16
    )

    response = tts_client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    # Play the synthesized audio
    with open("output.wav", "wb") as out:
        out.write(response.audio_content)
        print('Audio content written to file "output.wav"')

    # Add any additional functionality you need, such as playing the audio file