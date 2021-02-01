const Todos = require('./todos.model');
const TodoItem = require('./todoItem.model');
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
  const newTodoItem = await TodoItem.create({
    ...newTodo
  });

  console.log(newTodoItem, 'CREATED  TODOI')

  const findTodos = await Todos.findOneAndUpdate(
    { _id: id, taskId },
    {
      $push: {
        todo: newTodoItem
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



const updateTodoItem = async (todoItemId, data) => {
  const updatedTodoItem = await TodoItem.findByIdAndUpdate(todoItemId,
    data,
    {
      new: true
    }
  );

  const updatedTodos = await Todos.findOneAndUpdate({
    'todo._id': todoItemId
  },
    {
      '$set': {
        'todo.$': updatedTodoItem
      }
    }
    , {
      new: true
    });

  if (updatedTodos === null) {
    throw new NotFoundError(`Todo with id ${todoItemId} not found in todos list `);
  }
  return updatedTodos;
}


const deleteTodos = async (id, taskId) => {
  const columnTodos = await findByTaskId(taskId);
  if (columnTodos.length === 0) {
    throw new NotFoundError(`Todos with taskId ${taskId} not found`);
  } else {
    const isDeleted = (await Todos.deleteOne({ _id: id, taskId })).deletedCount;
    // const deletedItem = await TodoItem.deleteMany({ _id: itemId }).deletedCount;
    // if (isDeleted === 0) {
    //   throw new NotFoundError(`Todo with id ${itemId} not found`);
    // }
    if (isDeleted === 0) {
      throw new NotFoundError(`Todos with id ${id} not found`);
    }
  }
  return columnTodos;
};

const deleteTodosFromTask = async (taskId) => {
  const deletedTodos = await findByTaskId(taskId);
  if (deletedTodos.length !== 0) {
    await Todos.deleteMany({ taskId });
    return deletedTodos;
  }
  return [];
}

const deleteTodoItem = async (todosId, itemId) => {
  console.log(await TodoItem.find({}))
  console.log(await Todos.find({}), 'todos')

  const isDeleted = await TodoItem.deleteOne({ _id: itemId }).deletedCount;
  if (isDeleted === 0) {
    throw new NotFoundError(`Todo with id ${itemId} not found`);
  }

  const updatedTodoItem = await Todos.findByIdAndUpdate(todosId, {
    '$pull':
    {
      todo: {
        _id: itemId
      }
    }
  }, {
    new: true
  });
  if (updatedTodoItem === null) {
    throw new NotFoundError(`Todo with id ${todosId}not found in todos list `);
  }
  return updatedTodoItem;

}

module.exports = {
  getAll,
  getTodosById,
  createTodos,
  updateTodos,
  deleteTodos,
  createTodos,
  createTodoItem,
  deleteTodosFromTask,
  updateTodoItem,
  deleteTodoItem
};
