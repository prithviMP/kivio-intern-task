from dotenv import load_dotenv
import urllib.request
from gtts import gTTS
import os
import requests
import json

class AudioVideoGeneration:
    def __init__(self, avatar_source):
        load_dotenv()
        self.avatar_source = avatar_source

    def generate_audio_from_message(self, message, audio_output):
        print("Generating Audio...")
        try:
            tts = gTTS(message, lang='en')
            tts.save(audio_output)
            print("Audio generated!")
            return True
        except Exception as e:
            print(f"Error: {e}")
            print("Audio not generated!")
            return False

    def generate_video_from_audio(self, audio_source, video_output):
        print("Generating Video...")
        try:
            api_key = os.getenv("GOOEY_API_KEY")

            files = [
                ("input_face", open(self.avatar_source, "rb")),
                ("input_audio", open(audio_source, "rb")),
            ]
            payload = {
                "selected_model": "Wav2Lip",
            }

            response = requests.post(
                "https://api.gooey.ai/v2/Lipsync/form/",
                headers={
                    "Authorization": "Bearer " + api_key,
                },
                files=files,
                data={"json": json.dumps(payload)},
            )
            assert response.ok, response.content

            result = response.json()
            output_video_link = result["output"]["output_video"]
            urllib.request.urlretrieve(output_video_link, video_output)

            print("Video generated!")
            return True

        except Exception as e:
            print(f"Error: {e}")
            print("Video not generated!")
            return False
        
    def generate_video_from_message(self, text, audio_output="audio.mp3", video_output="video.mp4"):
        if not self.generate_audio_from_message(text, audio_output):
            return False
        if not self.generate_video_from_audio(audio_output, video_output):
            return False
        return True
    
if __name__ == "__main__":
    AVGen = AudioVideoGeneration("default.jpg")
    text = "Python is a high-level, interpreted programming language that is widely used for various purposes such as web development, scientific computing, data analysis, artificial intelligence, and more. It's known for its simplicity, readability, and ease of use, making it a popular choice among beginners and experienced programmers alike."
    success = AVGen.generate_audio_from_message(text, "media/aaba.mp3")