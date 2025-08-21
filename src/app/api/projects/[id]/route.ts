import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        tasks: {
          include: {
            timeEntries: true,
          },
        },
      },
    })
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(project)
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const project = await prisma.project.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        estimatedHours: body.estimatedHours,
        actualHours: body.actualHours,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        priority: body.priority,
        status: body.status,
        completedAt: body.status === 'COMPLETED' ? new Date() : null,
      },
      include: {
        tasks: true,
      },
    })
    return NextResponse.json(project)
  } catch (error) {
     console.error(error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id },
    })
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
