# Tasklane Assistant

The AI side of Tasklane, the project tracker we sell to teams. Two features run
here:

- **Ask Tasklane** (`POST /assistant/chat`): a chat assistant inside the app. It
  answers questions about a team's projects and tasks and can create tasks. It
  runs a tool-calling loop on OpenAI and keeps each conversation's history by
  `conversation_id`.
- **Ticket triage** (`POST /support/triage`): every support message customers
  send is labelled `bug`, `billing`, `how_to` or `feature_request` with a
  priority, so it lands in the right queue.

## Run

```sh
python -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
export OPENAI_API_KEY=...
uvicorn app.main:app --reload    # http://localhost:8000
pytest
```

## Layout

- `app/main.py` - the FastAPI app and routes
- `app/assistant.py` - the Ask Tasklane loop: system prompt, model call, tool dispatch
- `app/tools.py` - the assistant's tools (`search_tasks`, `create_task`)
- `app/triage.py` - support-ticket triage (one model call, JSON out)
- `app/llm.py` - the shared OpenAI client and model names
- `app/db.py` - in-memory data (organizations, projects, tasks); Postgres in production
- `app/conversations.py` - conversation history, in memory for now

## Try it

```sh
curl -s localhost:8000/assistant/chat -H 'Content-Type: application/json' \
  -d '{"org_id":"org_acme","user_id":"usr_1","message":"What is still open on the website relaunch?"}'

curl -s localhost:8000/support/triage -H 'Content-Type: application/json' \
  -d '{"message":"I was charged twice this month"}'
```
