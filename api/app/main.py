from fastapi import FastAPI
from app.db import init_db
from app.routes.layouts import router as layouts_router

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(layouts_router)
