import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { page = '1', limit = '10', status, search } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = { userId };

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.title = {
        contains: search as string,
        mode: 'insensitive',
      };
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.task.count({ where }),
    ]);

    res.json({
      tasks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

    const userId = req.userId!;

    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status = 'pending' } = req.body;
    const userId = req.userId!;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

    const { title, description, status } = req.body;
    const userId = req.userId!;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
      },
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

    const userId = req.userId!;

    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({ where: { id } });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

    const userId = req.userId!;

    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status: newStatus },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to toggle task status' });
  }
};

