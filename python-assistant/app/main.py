from fastapi import FastAPI
from typing import Optional

from pydantic import BaseModel

from . import assistant, conversations, triage

app = FastAPI(title="Tasklane Assistant")


class ChatRequest(BaseModel):
    org_id: str
    user_id: str
    message: str
    conversation_id: Optional[str] = None


class TriageRequest(BaseModel):
    message: str


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/assistant/chat")
def chat(req: ChatRequest):
    conversation_id = req.conversation_id or conversations.new_conversation_id()
    reply = assistant.answer(req.org_id, req.user_id, conversation_id, req.message)
    return {"conversation_id": conversation_id, "reply": reply}


@app.post("/support/triage")
def support_triage(req: TriageRequest):
    return triage.triage(req.message)
