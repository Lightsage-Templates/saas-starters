"""Support-ticket triage: one model call that labels a customer message."""

import json

from . import llm

LABELS = ["bug", "billing", "how_to", "feature_request"]
PRIORITIES = ["low", "normal", "urgent"]

TRIAGE_PROMPT = (
    "Label this support message for Tasklane, a project tracker. "
    f"Reply with JSON only: {{\"label\": one of {LABELS}, \"priority\": one of {PRIORITIES}, "
    "\"summary\": one short sentence}."
)


def triage(message: str) -> dict:
    response = llm.client().chat.completions.create(
        model=llm.TRIAGE_MODEL,
        messages=[
            {"role": "system", "content": TRIAGE_PROMPT},
            {"role": "user", "content": message},
        ],
        response_format={"type": "json_object"},
        temperature=0,
    )
    result = json.loads(response.choices[0].message.content or "{}")
    if result.get("label") not in LABELS:
        result["label"] = "how_to"
    if result.get("priority") not in PRIORITIES:
        result["priority"] = "normal"
    return result
