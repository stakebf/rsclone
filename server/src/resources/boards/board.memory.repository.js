const Board = require('./board.model.js');
const Column = require('./column.model.js');
const NotFoundError = require('../../errors/NotFoundError');

const BoardsData = [
  new Board({
    id: '1',
    title: 'Board1',
    columns: [
      new Column({ title: 'column1B1', order: '0' }),
      new Column({ title: 'column2B1', order: '1' }),
      new Column()
    ]
  }),
  new Board({
    id: '2',
    title: 'Board2',
    columns: [
      new Column({ title: 'column1B2', order: '0' }),
      new Column({ title: 'column2B2', order: '1' }),
      new Column()
    ]
  }),
  new Board({
    id: '3',
    title: 'Board3',
    columns: [
      new Column({ title: 'column1B3', order: '0' }),
      new Column({ title: 'column2B3', order: '1' }),
      new Column()
    ]
  }),
  new Board()
];

const findById = async id => {
  return BoardsData.find(board => {
    return board.id === id;
  });
};

const getAll = async () => {
  return BoardsData;
};

const getBoardById = async id => {
  const board = await findById(id);
  if (board === undefined) {
    throw new NotFoundError(`Board with id ${id} not found`);
  }
  return board;
};

const createBoard = async newBoard => {
  BoardsData.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, dataForUpdate) => {
  const findBoard = await getBoardById(id);
  if (findBoard === undefined) {
    throw new NotFoundError(`Board with id ${id} not found`);
  } else {
    const updatedBoard = {
      ...findBoard,
      ...dataForUpdate
    };
    const index = BoardsData.indexOf(findBoard);
    BoardsData[index] = updatedBoard;
    return updatedBoard;
  }
};

const deleteBoard = async id => {
  const deletedBoard = await getBoardById(id);
  if (deletedBoard === undefined) {
    throw new NotFoundError(`Board with id ${id} not found`);
  } else {
    const index = BoardsData.indexOf(deletedBoard);
    BoardsData.splice(index, 1);
  }
  return deletedBoard;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
