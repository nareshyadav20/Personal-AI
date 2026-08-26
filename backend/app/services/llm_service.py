import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(dotenv_path=BASE_DIR / ".env")
load_dotenv()

class LLMService:
    def __init__(self):
        # Load Groq API Key from environment variable only — never hard-code
        self.api_key = os.getenv("GROQ_API_KEY")

        if not self.api_key:
            raise ValueError(
                "GROQ_API_KEY environment variable is not set. "
                "Please add it to your .env file or set it in your environment."
            )
        
        # Initialize Groq Client
        self.client = Groq(api_key=self.api_key)
        # Ultra fast & powerful model (falls back to groq/compound)
        self.model_name = os.getenv("GROQ_MODEL_NAME") or "groq/compound"

    async def generate_response(self, prompt: str, system_instruction: str = None) -> str:
        try:
            messages = []
            if system_instruction:
                messages.append({"role": "system", "content": system_instruction})
            
            messages.append({"role": "user", "content": prompt})

            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=messages,
                temperature=0.7,
                max_tokens=1024,
            )
            return response.choices[0].message.content
        except Exception as e:
            print("\n[ERROR] GROQ API ERROR:", str(e), "\n")
            raise Exception(f"Groq AI Generation Error: {str(e)}")

    async def generate_with_context(self, prompt: str, context: str) -> str:
        full_prompt = f"Context:\n{context}\n\nUser Prompt:\n{prompt}"
        return await self.generate_response(full_prompt)

    async def refine_text(self, text: str, instruction: str) -> str:
        refine_prompt = f"Original Text:\n{text}\n\nInstruction for Refinement:\n{instruction}"
        return await self.generate_response(refine_prompt)

llm_service = LLMService()