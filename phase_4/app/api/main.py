from fastapi import FastAPI
from routers import  activity


    
app = FastAPI()



app.include_router(activity.router)


