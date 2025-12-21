from datetime import datetime
from typing import Optional
from uuid import UUID
from ninja import Schema


class LayoutCreate(Schema):
    name: str
    content: Optional[str] = None


class LayoutUpdate(Schema):
    name: Optional[str] = None
    content: Optional[str] = None


class LayoutRead(Schema):
    id: UUID
    name: str
    content: Optional[str] = None
    created_at: datetime
