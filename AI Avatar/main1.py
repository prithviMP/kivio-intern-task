import os
import pygame
import time
from gtts import gTTS
from llamaapi import LlamaAPI

# Initialize LLaMA API client
llama = LlamaAPI('LL-tDixgGHyXY3PPnptH17zUSa8QUdX4WPtw5tDvU1ryOM1Qr1Wye3OzSFHMoc0CG8Y')

def generate_response(prompt):
    api_request_json = {"model": "gemma-7b", "messages": [{"role": "user", "content": prompt}]}
    response = llama.run(api_request_json)
    try:
        ai_response = response.json()['choices'][0]['message']['content']
    except KeyError as e:
        print(f"Error: {e}")
        ai_response = "Sorry, I encountered an error and couldn't generate a response."
    return ai_response

def play_audio(file_path):
    pygame.mixer.init()
    pygame.mixer.music.load(file_path)
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy():
        time.sleep(0.1)  # Wait for the audio to finish playing
    pygame.mixer.quit()

while True:
    user_input = input("You: ")
    ai_response = generate_response(user_input)
    tts = gTTS(ai_response, lang='en')
    output_file_path = 'C:\\Users\\pooja\\AI Avatar\\output.mp3'
    if os.path.exists(output_file_path):
        os.remove(output_file_path)  # Attempt to remove the file if it exists
    tts.save(output_file_path)
    play_audio(output_file_path)
    os.remove(output_file_path)  # Remove the file after playback is complete
    print("LLaMA:", ai_response)