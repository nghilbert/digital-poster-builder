from sqlmodel import SQLModel
from typing import Dict, Any
from datetime import datetime
import uuid


class LayoutCreate(SQLModel):
    name: str
    node_data: Dict[str, Any]


class LayoutRead(LayoutCreate):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
