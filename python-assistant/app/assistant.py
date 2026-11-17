"""Ask Tasklane: answers questions about a team's work and can create tasks."""

from . import conversations, llm, tools

SYSTEM_PROMPT = (
    "You are Tasklane's assistant. Answer questions about the user's projects and tasks "
    "using the tools. Only report tasks the tools return. Keep answers short."
)

MAX_TOOL_ROUNDS = 5


def answer(org_id: str, user_id: str, conversation_id: str, message: str) -> str:
    conversations.append(conversation_id, {"role": "user", "content": message})
    messages = [{"role": "system", "content": SYSTEM_PROMPT}, *conversations.history(conversation_id)]

    for _ in range(MAX_TOOL_ROUNDS):
        response = llm.client().chat.completions.create(
            model=llm.ASSISTANT_MODEL,
            messages=messages,
            tools=tools.TOOL_SPECS,
        )
        choice = response.choices[0].message
        if not choice.tool_calls:
            reply = choice.content or ""
            conversations.append(conversation_id, {"role": "assistant", "content": reply})
            return reply

        messages.append(choice.model_dump(exclude_none=True))
        for call in choice.tool_calls:
            output = tools.run_tool(org_id, call.function.name, call.function.arguments)
            messages.append({"role": "tool", "tool_call_id": call.id, "content": output})

    reply = "Sorry, I couldn't finish that. Try asking in a simpler way."
    conversations.append(conversation_id, {"role": "assistant", "content": reply})
    return reply
