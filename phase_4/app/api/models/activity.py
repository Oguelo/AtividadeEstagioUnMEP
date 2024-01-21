from pydantic import BaseModel
from enum import Enum
from datetime import date

class ActivityBase(BaseModel):
    id:int
    title: str
    description: str
    date: date
    status: str
class ActivityUpdateAndCreate(BaseModel):
    title: str
    description: str
    date: str
    status: str