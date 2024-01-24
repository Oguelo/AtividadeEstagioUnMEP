from pydantic import BaseModel
from enum import Enum
from datetime import date

class ActivityUpdateAndCreate(BaseModel):
    title: str
    description: str
    date: str
    status: str
class ActivityBase:
    def __init__(self, id: int, title: str, description: str, date: str, status: str):
        self.id = id
        self.title = title
        self.description = description
        self.date = date
        self.status = status
        
class ActivityStatusUpdate(BaseModel):
    status: str