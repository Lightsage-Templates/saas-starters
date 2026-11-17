"""In-memory data store. Replaced by Postgres in production; same shape."""

organizations = [
    {"id": "org_acme", "name": "Acme Corp", "plan": "business"},
    {"id": "org_globex", "name": "Globex", "plan": "team"},
]

projects = [
    {"id": "prj_1", "org_id": "org_acme", "name": "Website relaunch"},
    {"id": "prj_2", "org_id": "org_acme", "name": "Q3 hiring"},
    {"id": "prj_3", "org_id": "org_globex", "name": "Warehouse migration"},
]

tasks = [
    {"id": "tsk_1", "project_id": "prj_1", "title": "New pricing page copy", "status": "open", "assignee": "usr_2"},
    {"id": "tsk_2", "project_id": "prj_1", "title": "Redirect old blog URLs", "status": "done", "assignee": "usr_1"},
    {"id": "tsk_3", "project_id": "prj_1", "title": "Cookie banner", "status": "open", "assignee": None},
    {"id": "tsk_4", "project_id": "prj_2", "title": "Post backend role", "status": "open", "assignee": "usr_1"},
    {"id": "tsk_5", "project_id": "prj_3", "title": "Count pallets in bay 4", "status": "open", "assignee": "usr_3"},
]

_next_task = len(tasks) + 1


def new_task_id() -> str:
    global _next_task
    task_id = f"tsk_{_next_task}"
    _next_task += 1
    return task_id
