import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db import engine
from app.models import Layout
from app.schemas.layout import LayoutCreate, LayoutRead
import uuid

router = APIRouter(prefix="/layouts", tags=["layouts"])


def get_session():
    with Session(engine) as session:
        yield session


@router.post("/", response_model=LayoutRead)
def create_layout(payload: LayoutCreate, session: Session = Depends(get_session)):
    layout = Layout(**payload.model_dump())
    session.add(layout)
    session.commit()
    session.refresh(layout)
    return layout


@router.get("/", response_model=list[LayoutRead])
def list_layouts(session: Session = Depends(get_session)):
    return session.exec(select(Layout)).all()


@router.get("/{layout_id}", response_model=LayoutRead)
def get_layout(layout_id: uuid.UUID, session: Session = Depends(get_session)):
    layout = session.get(Layout, layout_id)
    if not layout:
        raise HTTPException(status_code=404, detail="Layout not found")
    return layout


@router.patch("/{layout_id}", response_model=LayoutRead)
def update_layout(
    layout_id: uuid.UUID, payload: LayoutCreate, session: Session = Depends(get_session)
):
    layout = session.get(Layout, layout_id)
    if not layout:
        raise HTTPException(status_code=404, detail="Layout not found")

    layout.name = payload.name
    layout.node_data = payload.node_data
    layout.updated_at = datetime.utcnow()

    session.add(layout)
    session.commit()
    session.refresh(layout)
    return layout
