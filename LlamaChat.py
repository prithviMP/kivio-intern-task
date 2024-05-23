from dotenv import load_dotenv
from llamaapi import LlamaAPI
import json
import os

class LlamaChat:
    def __init__(self, llama_model="llama3-70b", system_message="You are a chat assistant who will give answers to the message. You will act as an conversational AI chatbot. Do not generate text-formatted responses. Try to be concise and specific."):
        load_dotenv()
        self.api_key = os.getenv("LLAMA_API_KEY")
        self.llama_model = llama_model
        self.system_message = system_message
        self.llama = LlamaAPI(self.api_key)
    
    def get_response(self, message):
        error = None
        for i in range(3):
            try:
                api_request_json = {
                    "model": self.llama_model,
                    "messages": [
                        {"role": "system", "content": self.system_message},
                        {"role": "user", "content": message}
                    ]
                }
                response = self.llama.run(api_request_json).json()
                response_message = response['choices'][-1]['message']['content']
                return True, response_message
            
            except Exception as e:
                error = e
        print(f"An error occurred: {error}")
        return False, None

if __name__ == "__main__":
    llama_chat = LlamaChat()
    message = "What is the capital of France?"
    success, response = llama_chat.get_response(message)
    if success:
        print(response)
    else:
        print("An error occurred.")