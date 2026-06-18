from dotenv import load_dotenv
import os
from groq import Groq

# 👇 THIS IS THE IMPORTANT LINE
load_dotenv()

print("Loaded key:", os.getenv("GROQ_API_KEY"))

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "user", "content": "Say hello"}
    ]
)

print(response.choices[0].message.content)