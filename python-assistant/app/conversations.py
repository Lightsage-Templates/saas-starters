"""Conversation history per conversation_id. In memory for now; Redis later."""

import uuid

_history: dict[str, list[dict]] = {}


def new_conversation_id() -> str:
    return f"conv_{uuid.uuid4().hex[:12]}"


def history(conversation_id: str) -> list[dict]:
    return _history.setdefault(conversation_id, [])


def append(conversation_id: str, *messages: dict) -> None:
    history(conversation_id).extend(messages)
