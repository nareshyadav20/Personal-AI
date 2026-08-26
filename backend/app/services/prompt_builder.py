from typing import Optional, Dict, Any

class PromptBuilder:
    """
    Constructs optimized, platform-specific system prompts based on 
    user dropdown selections, templates, and memory context.
    """

    PLATFORM_SPECIFIC_INSTRUCTIONS = {
        "linkedin": (
            "Optimize for LinkedIn engagement. Use clear spacing, short paragraphs, "
            "a strong hook in the first 2 lines, and 3-5 relevant hashtags at the end."
        ),
        "x": (
            "Keep it crisp, punchy, and under 280 characters unless specified as a thread. "
            "Use strong call-to-actions and concise language."
        ),
        "email": (
            "Format as a proper email including a Subject Line, Greeting, Body, "
            "Call to Action, and Professional Sign-off."
        ),
        "blog": (
            "Structure with clear markdown headings (H2, H3), bullet points where applicable, "
            "and an engaging introduction and conclusion."
        ),
        "caption": (
            "Create a catchy social media caption with a strong hook, relatable language, "
            "and subtle call to action."
        )
    }

    @classmethod
    def build_generation_prompt(
        cls,
        platform: str,
        content_type: str,
        tone: str,
        audience: str,
        length: str,
        custom_prompt: Optional[str] = None,
        user_memory: Optional[Dict[str, Any]] = None
    ) -> str:
        
        # 1. Platform Specific Guidelines
        platform_lower = platform.lower()
        platform_rule = cls.PLATFORM_SPECIFIC_INSTRUCTIONS.get(
            platform_lower, 
            "Format appropriately for the chosen platform."
        )

        # 2. Inject Context / Memory (if available)
        memory_context_str = ""
        if user_memory:
            memory_context_str = "\n--- USER CONTEXT & MEMORY ---\n"
            for key, val in user_memory.items():
                memory_context_str += f"- {key.capitalize()}: {val}\n"

        # 3. Handle Extra User Instructions
        custom_instructions = ""
        if custom_prompt and custom_prompt.strip():
            custom_instructions = f"\n--- ADDITIONAL USER INSTRUCTIONS ---\n{custom_prompt.strip()}\n"

        # 4. Master Prompt Assembly
        prompt = f"""
You are Ghostwriter Bot, an elite AI copywriter and content strategist.
Your task is to write high-converting, engaging {content_type} specifically designed for {platform.capitalize()}.

--- PARAMETERS ---
• Platform: {platform.capitalize()}
• Content Type: {content_type.capitalize()}
• Tone: {tone.capitalize()}
• Target Audience: {audience.capitalize()}
• Length: {length.capitalize()}

--- FORMATTING & PLATFORM RULES ---
{platform_rule}
{memory_context_str}
{custom_instructions}
--- CRITICAL INSTRUCTIONS ---
1. Do NOT include meta-text, introductory conversational filler (e.g., "Sure, here is your post"), or markdown wrapper blocks like ```markdown. Output ONLY the raw final content.
2. Ensure the tone is strictly {tone.capitalize()} and tailored directly to {audience.capitalize()}.
3. Seamlessly incorporate any relevant user memory provided above if it adds value to the content.

Generate the final output now:
"""
        return prompt.strip()

    @classmethod
    def build_refinement_prompt(
        cls,
        original_content: str,
        action: str
    ) -> str:
        """
        Generates prompt for one-click refinements (Make Shorter, Add Emojis, etc.)
        """
        refinement_instructions = {
            "make_shorter": "Make this content significantly more concise while retaining the core message.",
            "make_longer": "Expand on the ideas in this content, adding depth, details, and examples.",
            "make_professional": "Rewrite this content with a highly professional, authoritative, and corporate tone.",
            "make_casual": "Rewrite this in a casual, conversational, and relaxed tone.",
            "add_emojis": "Enhance this content by adding relevant and visually appealing emojis.",
            "remove_emojis": "Remove all emojis from this content while keeping the structure intact.",
            "make_funny": "Inject humor, wit, and a lighthearted tone into this content.",
            "make_technical": "Rewrite this using more technical, domain-specific terminology and precision."
        }

        instruction = refinement_instructions.get(action, f"Refine the content based on action: {action}")

        prompt = f"""
You are an expert content editor. Modify the following content based strictly on the action instruction.

--- ACTION INSTRUCTION ---
{instruction}

--- ORIGINAL CONTENT ---
{original_content}

--- CRITICAL INSTRUCTIONS ---
• Output ONLY the refined version. 
• Do NOT include any explanations, greetings, or commentary.
• Preserve formatting standards suitable for the platform of the original content.
"""
        return prompt.strip()