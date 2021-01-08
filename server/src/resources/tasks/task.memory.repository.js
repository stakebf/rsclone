const Task = require('./task.model.js');
const NotFoundError = require('../../errors/NotFoundError');

const TasksData = [
  new Task({
    id: '1',
    title: 'Task1',
    order: 0,
    description: 'task1',
    userId: '1',
    boardId: '1',
    columnId: '1'
  }),
  new Task({
    id: '2',
    title: 'Task2',
    order: 1,
    description: 'task2',
    userId: '2',
    boardId: '2',
    columnId: '2'
  }),
  new Task({
    id: '3',
    title: 'Task3',
    order: 2,
    description: 'task3',
    userId: '3',
    boardId: '3',
    columnId: '3'
  }),
  new Task()
];

const findByUserId = userId => {
  return TasksData.map(task => {
    if (task.userId === userId) {
      task.userId = null;
      return task;
    }
    return task;
  });
};

const findByBoardId = boardId => {
  return TasksData.filter(task => {
    return task.boardId === boardId;
  });
};

const getAll = async boardId => {
  return findByBoardId(boardId);
};

const getTaskById = async (id, boardId) => {
  const taskOnBoard = await getAll(boardId);
  const task = taskOnBoard.find(el => {
    return el.id === id;
  });
  if (task === undefined) {
    throw new NotFoundError(`Task with id ${id} not found`);
  }
  return task;
};

const createTask = async newTask => {
  TasksData.push(newTask);
  return newTask;
};

const updateTask = async (id, boardId, dataForUpdate) => {
  const findTask = await getTaskById(id, boardId);
  if (findTask === undefined) {
    throw new NotFoundError(`Task with id ${id} not found`);
  } else {
    const updatedTask = {
      ...findTask,
      ...dataForUpdate
    };
    const index = TasksData.indexOf(findTask);
    TasksData[index] = updatedTask;
    return updatedTask;
  }
};

const deleteTask = async (id, boardId) => {
  const boardTask = findByBoardId(boardId);
  let isDeleted = false;
  if (boardTask.length === 0) {
    throw new NotFoundError(`Task with boardId ${boardId} not found`);
  } else {
    boardTask.forEach(task => {
      if (task.id === id) {
        const index = TasksData.indexOf(task);
        TasksData.splice(index, 1);
        isDeleted = true;
      }
    });
    if (!isDeleted) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
  }
  return boardTask;
};

const deleteTaskfromBoard = boardId => {
  const deletedTask = findByBoardId(boardId);
  if (deletedTask.length !== 0) {
    deletedTask.forEach(task => {
      const index = TasksData.indexOf(task);
      TasksData.splice(index, 1);
    });
  }
  return [];
};

const unassignTask = async userId => {
  return findByUserId(userId);
};

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteTaskfromBoard,
  unassignTask
};
