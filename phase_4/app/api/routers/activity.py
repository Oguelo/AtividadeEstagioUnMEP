from fastapi import APIRouter,HTTPException,status
from models.activity import ActivityUpdateAndCreate,ActivityBase, ActivityStatusUpdate
from services import servicesTasks

router = APIRouter(prefix="/activity", tags=["Activity"])


@router.post("/", description="Create an activity")
def create_activity(new_activity: ActivityUpdateAndCreate): 
    id_generate = servicesTasks.create_activity(new_activity)
   
    activity = ActivityBase(id = id_generate,title = new_activity.title, description=new_activity.description,date= new_activity.date, status=new_activity.status)
    if id_generate:
        return activity
    else:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Falha ao criar a atividade")


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
def update_activity(activity_update: ActivityUpdateAndCreate, id: int):
    result = servicesTasks.update_activity(activity_update, id)
    if result: 
        return{"message": result}
   

@router.patch("/status/{id}", description="Update an status activity")
def update_activity_status( id: int, activity_update: ActivityStatusUpdate):   

    result = servicesTasks.update_activityStatus(id, activity_update)
    
    if result:
        return{"message": result}
   

@router.delete("/{id}", description="Delete an activity by its ID")
def delete_activity(id: int):
  
    servicesTasks.delete_activity(id)
    return f"Tarefa apagada"

