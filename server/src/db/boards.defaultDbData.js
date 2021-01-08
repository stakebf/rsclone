const Board = require('../resources/boards/board.model');
const Column = require('../resources/boards/column.model');

const boardsData = [
  new Board({
    id: '1',
    title: 'Board1',
    columns: [
      new Column({ title: 'column1B1', order: '0' }),
      new Column({ title: 'column2B1', order: '1' })
    ]
  }),
  new Board({
    id: '2',
    title: 'Board2',
    columns: [
      new Column({ title: 'column1B2', order: '0' }),
      new Column({ title: 'column2B2', order: '1' })
    ]
  })
];

module.exports = boardsData;
