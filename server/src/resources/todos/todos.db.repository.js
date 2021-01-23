const Todos = require('./todos.model');
const NotFoundError = require('../../errors/NotFoundError');

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

module.exports = {
  getAll,
  getTodosById,
  createTodos,
  updateTodos,
  deleteTodos,
  createTodos,
  createTodoItem
};
