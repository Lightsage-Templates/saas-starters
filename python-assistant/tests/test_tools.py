from app import tools


def test_search_is_scoped_to_org():
    found = tools.search_tasks("org_globex")
    assert [t["id"] for t in found] == ["tsk_5"]


def test_search_by_project_and_status():
    found = tools.search_tasks("org_acme", project="website", status="open")
    assert {t["id"] for t in found} == {"tsk_1", "tsk_3"}


def test_create_task_in_own_project():
    task = tools.create_task("org_acme", "hiring", "Schedule interviews")
    assert task["project_id"] == "prj_2"
