const express = require('express');
const router = express.Router();
const {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  getTask,
} = require('../controllers/tasks');

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', createTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks (can be filtered using 'status' param)
 *     description: Retrieves all tasks for the authenticated user with a 'status' param with values ('completed', 'incomplete', 'all').
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/', getAllTasks);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a specific task
 *     description: Retrieves a specific task for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 */
router.get('/:id', getTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   patch:
 *     summary: Update a task
 *     description: Updates the task details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.patch('/:id', updateTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a specific task for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete('/:id', deleteTask);

module.exports = router;
