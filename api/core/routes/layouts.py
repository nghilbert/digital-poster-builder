from uuid import UUID
from django.shortcuts import get_object_or_404
from django.utils import timezone
from ninja import Router
from ninja.responses import Response

from core.models import Layout
from core.schemas.layout import LayoutCreate, LayoutRead, LayoutUpdate

router = Router(tags=["layouts"])


@router.post("/layouts", response=LayoutRead)
def create_layout(request, payload: LayoutCreate):
    layout = Layout.objects.create(
        name=payload.name,
        content=payload.content,
    )
    return layout


@router.get("/layouts", response=list[LayoutRead])
def list_layouts(request):
    return list(Layout.objects.all())


@router.get("/layouts/{layout_id}", response=LayoutRead)
def get_layout(request, layout_id: UUID):
    layout = get_object_or_404(Layout, id=layout_id)
    return layout


@router.patch("/layouts/{layout_id}", response=LayoutRead)
def update_layout(request, layout_id: UUID, payload: LayoutUpdate):
    layout = get_object_or_404(Layout, id=layout_id)

    if payload.name is not None:
        layout.name = payload.name
    if payload.content is not None:
        layout.content = payload.content

    layout.save()
    return layout


@router.delete("/layouts/{layout_id}", response={204: None})
def delete_layout(request, layout_id: UUID):
    layout = get_object_or_404(Layout, id=layout_id)
    layout.delete()
    return Response(status=204)
