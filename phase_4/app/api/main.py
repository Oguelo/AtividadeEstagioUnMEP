from fastapi import FastAPI
from routers import  activity
from fastapi.middleware.cors import CORSMiddleware

    
app = FastAPI()



app.include_router(activity.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
