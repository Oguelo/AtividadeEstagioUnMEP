from datetime import date
from models.activity import ActivityBase, ActivityUpdateAndCreate, ActivityStatusUpdate
from datetime import date
from typing import List
from database.database import DB


def convertDTOFront(item: dict) -> ActivityBase:
     return ActivityBase(**item)
def formatBR(dateUn: str):
    data_recebida = date.fromisoformat(dateUn)
    data_formatada = data_recebida.strftime("%d/%m/%Y")
    return data_formatada
    
def get_tasks() -> List[ActivityBase]:
    list_tasks = []

    with DB() as db:
        db.execute("SELECT * FROM activities")
        data = db.fetchall()
    
    list_tasks = map(convertDTOFront, data)

    return list(list_tasks)

def get_tasks_id(activity_id: int):
    with DB() as db:
        db.execute("SELECT * FROM activities WHERE id = %s", [activity_id])
        data = db.fetchone()
 
    if data is not None:
       return ActivityBase(**data)
    
    return "Não existe task cadastrada com esse ID"
    

def create_activity(activity: ActivityUpdateAndCreate):
    with DB() as db:
            db.execute("INSERT INTO activities (title, description, date, status) VALUES (%s, %s, %s, %s)",
                       [activity.title, activity.description, activity.date, activity.status])

            db.execute("SELECT id FROM activities WHERE title = %s", [activity.title])
            result = db.fetchone()
        
            return result['id']
       
               
        
        
def delete_activity(activity_id: int):
    with DB() as db:
        db.execute("DELETE FROM activities WHERE id = %s", [activity_id])

def update_activity(activity_update: ActivityUpdateAndCreate, activity_id: int):
    with DB() as db:
        result = get_tasks_id(activity_id)
        if isinstance(result, ActivityBase):
            db.execute("UPDATE activities SET title = %s, description = %s, date = %s, status = %s WHERE id = %s", (activity_update.title, activity_update.description, activity_update.date, activity_update.status, activity_id))
            return "Task atualizada"
        return "Task não alterada"    

def update_activityStatus(activity_id: int, activityNewStatus: ActivityStatusUpdate):
    with DB() as db:
       
       db.execute("UPDATE activities SET status = %s WHERE id = %s", (activityNewStatus.status,activity_id))
       return "Activity updated successfully"    