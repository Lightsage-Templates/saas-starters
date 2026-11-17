"""Tools the Ask Tasklane assistant can call. Each is scoped to the caller's org."""

from __future__ import annotations

import json

from . import db

TOOL_SPECS = [
    {
        "type": "function",
        "function": {
            "name": "search_tasks",
            "description": "Find tasks in the caller's organization by project name, status or text.",
            "parameters": {
                "type": "object",
                "properties": {
                    "project": {"type": "string", "description": "Project name, or part of it"},
                    "status": {"type": "string", "enum": ["open", "done"]},
                    "text": {"type": "string", "description": "Text to look for in task titles"},
                },
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "create_task",
            "description": "Create a task in one of the caller's projects.",
            "parameters": {
                "type": "object",
                "properties": {
                    "project": {"type": "string"},
                    "title": {"type": "string"},
                },
                "required": ["project", "title"],
            },
        },
    },
]


def _org_projects(org_id: str) -> list[dict]:
    return [p for p in db.projects if p["org_id"] == org_id]


def search_tasks(org_id: str, project: str | None = None, status: str | None = None, text: str | None = None) -> list[dict]:
    projects = _org_projects(org_id)
    if project:
        projects = [p for p in projects if project.lower() in p["name"].lower()]
    ids = {p["id"]: p["name"] for p in projects}
    found = []
    for t in db.tasks:
        if t["project_id"] not in ids:
            continue
        if status and t["status"] != status:
            continue
        if text and text.lower() not in t["title"].lower():
            continue
        found.append({**t, "project": ids[t["project_id"]]})
    return found


def create_task(org_id: str, project: str, title: str) -> dict:
    matches = [p for p in _org_projects(org_id) if project.lower() in p["name"].lower()]
    if not matches:
        return {"error": f"No project called {project!r}"}
    task = {"id": db.new_task_id(), "project_id": matches[0]["id"], "title": title, "status": "open", "assignee": None}
    db.tasks.append(task)
    return task


def run_tool(org_id: str, name: str, arguments: str) -> str:
    args = json.loads(arguments or "{}")
    if name == "search_tasks":
        result = search_tasks(org_id, **args)
    elif name == "create_task":
        result = create_task(org_id, **args)
    else:
        result = {"error": f"Unknown tool {name}"}
    return json.dumps(result)
