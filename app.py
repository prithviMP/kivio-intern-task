import os
import cv2
import pygame
import threading
import tkinter as tk
from PIL import Image, ImageTk

from LlamaChat import LlamaChat
from AudioVideoGeneration import AudioVideoGeneration

class VideoStream:
    def __init__(self, window, window_title, audio_source="audio.mp3", video_source="output.mp4", avatar_path="default.jpg"):
        self.video_source = video_source
        self.audio_source = audio_source
        self.avatar_source = avatar_path
        self.vid = None
        self.AVGen = AudioVideoGeneration(self.avatar_source)
        self.LlamaChat = LlamaChat(llama_model='alpaca-7b')

        self.resize_width = 600
        self.resize_height = 600
        self.window = window
        self.window.title(window_title)

        self.canvas = tk.Canvas(window, width=self.resize_width, height=self.resize_height)
        self.canvas.pack()

        self.entry = tk.Entry(window, width=50)
        self.entry.pack(anchor=tk.CENTER, pady=10)

        self.btn_send_message = tk.Button(window, text="Ask the AI", width=50, command=self.send_message)
        self.btn_send_message.pack(anchor=tk.CENTER, pady=10)

        self.delay = 29
        self.show_image = True
        self.image = Image.open(self.avatar_source).resize((self.resize_width, self.resize_height))
        self.photo = ImageTk.PhotoImage(self.image)
        
        self.update_image()
        self.window.mainloop()

    def play_audio(self, audio_path):
        # try:
        pygame.mixer.init()
        pygame.mixer.music.load(audio_path)
        pygame.mixer.music.play()
        # finally:
        

    def play_video(self):
        if not self.show_image:
            return
        self.show_image = False

        self.vid = cv2.VideoCapture(self.video_source)
        print("Playing video...")
        self.audio_thread = threading.Thread(target=self.play_audio, args=(self.audio_source,))
        self.audio_thread.start()
        self.update_video()

    def update_image(self):
        if self.show_image:
            self.photo = ImageTk.PhotoImage(self.image)
            self.canvas.create_image(0, 0, image=self.photo, anchor=tk.NW)

    def update_video(self):
        ret, frame = self.vid.read()

        if ret:
            frame = cv2.resize(frame, (self.resize_width, self.resize_height))
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            self.photo = ImageTk.PhotoImage(image=Image.fromarray(frame))
            self.canvas.create_image(0, 0, image=self.photo, anchor=tk.NW)
            self.window.after(self.delay, self.update_video)
        else:
            self.show_image = True
            self.update_image()

    def send_message(self):
        self.__del__()

        message = self.entry.get()
        self.entry.delete(0, tk.END)

        print(f"Recieved Message: {message}")
        success, response = self.LlamaChat.get_response(message)
        print(f"Response: {response}")
        if not success:
            return
        if not self.AVGen.generate_video_from_message(response, audio_output=self.audio_source, video_output=self.video_source):
            return
        self.play_video()

    def __del__(self):
        if self.vid and self.vid.isOpened():
            self.vid.release()
        try:
            pygame.mixer.music.stop()
            pygame.mixer.quit()
        except:
            pass
        if os.path.exists(self.video_source):
            os.remove(self.video_source)
        if os.path.exists(self.audio_source):
            os.remove(self.audio_source)

if __name__ == '__main__':
    root = tk.Tk()
    app = VideoStream(root, "AI Conversational Chatbot", video_source="media/video.mp4", audio_source="media/audio.mp3", avatar_path="media/avatar2.png")
