from fastapi import APIRouter
from models.activity import ActivityUpdate, ActivityBase
from services import servicesTasks

router = APIRouter(prefix="/activity", tags=["Activity"])


@router.post("/", description="Create an activity")
def create_activity(new_activity: ActivityUpdate):
    servicesTasks.create_activity(new_activity)
    return f"Tarefa criada"


@router.get("/all", description="Get all activities")
def list_activities():
    return servicesTasks.get_tasks()

@router.get("/{id}", description="Get a specific activity")
def get_activity(id: int):
    result = servicesTasks.get_tasks_id(id)
    if isinstance(result, ActivityBase):
        return result
    return{"message": result}

@router.patch("/{id}", description="Update an activity")
def update_activity(activity_update: ActivityUpdate, id: int):
    result = servicesTasks.update_activity(activity_update, id)
    if isinstance(result, ActivityBase):
        return result
    return{"message": result}


@router.delete("/{id}", description="Delete an activity by its ID")
def delete_activity(id: int):
    servicesTasks.delete_activity(id)
    return f"Tarefa apagada"

