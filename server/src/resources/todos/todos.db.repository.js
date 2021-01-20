const Todos = require('./todos.model');

const NotFoundError = require('../../errors/NotFoundError');

const findByUserId = async userId => {
  const TodosByUser = Task.find({ userId });
  const task = await Task.updateMany({ taskByUser, userId: null });
  return task;
};

const findByTaskId = taskId => {
  return Todos.find({ taskId });
};

const getAll = async taskId => {
  const todosOnTask = findByTaskId(taskId);
  if (todosOnTask === null) {
    throw new NotFoundError(`Todos with id ${id} not found`);
  }
  return todosOnTask;
};

const getTodosById = async (id, taskId) => {
  const TodosOnColumn = await Todos.findOne({ _id: id, taskId });
  if (TodosOnColumn === null) {
    throw new NotFoundError(`Todos with id ${id} not found`);
  }
  return TodosOnColumn;
};

const createTodos = (taskId, newTodos) => {
  return Todos.create({
    ...newTodos,
    taskId
  });

};

const updateTodos = async (id, taskId, dataForUpdate) => {
  const findTodos = await Todos.findOneAndUpdate(
    { _id: id, taskId },
    dataForUpdate,
    {
      new: true
    }
  );
  if (findTodos === null) {
    throw new NotFoundError(`Todos with id ${id} not found`);
  }
  return findTodos;
};


const createTodoItem = async (id, taskId, newTodo) => {
  const findTodos = await Todos.findOneAndUpdate(
    { _id: id, taskId },
    {
          $push: {
            todo: {
              ...newTodo
            }
          }
    },
    {
      new: true
    }
  );
  if (findTodos === null) {
    throw new NotFoundError(`Todos with id ${id} not found`);
  }
  return findTodos;
};



const deleteTodos = async (id, taskId) => {
  const columnTodos = await findBytaskId(taskId);
  if (columnTodos.length === 0) {
    throw new NotFoundError(`Todos with taskId ${taskId} not found`);
  } else {
    const isDeleted = (await Todos.deleteOne({ _id: id, taskId })).deletedCount;
    if (isDeleted === 0) {
      throw new NotFoundError(`Todos with id ${id} not found`);
    }
  }
  return columnTodos;
};

const deleteTodosFromColumn = async taskId => {
  const deletedTodos = await findBytaskId(taskId);
  if (deletedTodos.length === 0) {
    throw new NotFoundError(`Todos with taskId ${taskId} not found`);
  } else {
    if (deletedTodos.length !== 0) {
      await Todos.deleteMany({ taskId });
      return deletedTodos;
    }
  }
  return [];
};

const unassignTodos = async userId => {
  return findByUserId(userId);
};

module.exports = {
  getAll,
  getTodosById,
  createTodos,
  updateTodos,
  deleteTodos,
  unassignTodos,
  deleteTodosFromColumn,
  createTodos,
  createTodoItem
};
