"""The shared OpenAI client and the models each feature uses."""

from __future__ import annotations

import os

from openai import OpenAI

ASSISTANT_MODEL = os.environ.get("ASSISTANT_MODEL", "gpt-4o-mini")
TRIAGE_MODEL = os.environ.get("TRIAGE_MODEL", "gpt-4o-mini")

_client: OpenAI | None = None


def client() -> OpenAI:
    global _client
    if _client is None:
        _client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    return _client
