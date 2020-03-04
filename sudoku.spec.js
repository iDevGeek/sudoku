const {Sudoku} = require('./sudoku');

// https://www.bigfishgames.com/blog/how-to-solve-sudoku-puzzles-quickly-and-reliably/
const data = [
	[null, null, 2, 4, null, null, null, 3, 9],
	[9, 8, null, null, 7, null, 6, null, 4],
	[5, null, null, null, 1, 3, null, 7, null],
	[2, null, null, 8, 4, null, 9, null, 7],
	[null, 5, 6, 3, null, null, null, null, 1],
	[4, null, null, 2, null, 1, null, 8, 6],
	[6, null, null, null, 9, 1, null, 2, null],
	[7, null, 5, 4, null, null, null, 3, null],
	[1, 3, null, null, null, 5, 6, null, 8]
];

const resultExpected = [
	[1, 7, 2, 4, 6, 8, 5, 3, 9],
	[9, 8, 3, 5, 7, 2, 6, 1, 4],
	[5, 6, 4, 9, 1, 3, 8, 7, 2],
	[2, 1, 3, 8, 4, 6, 9, 5, 7],
	[8, 5, 6, 3, 9, 7, 2, 4, 1],
	[4, 9, 7, 2, 5, 1, 3, 8, 6],
	[6, 8, 4, 3, 9, 1, 7, 2, 5],
	[7, 2, 5, 4, 6, 8, 1, 3, 9],
	[1, 3, 9, 7, 2, 5, 6, 4, 8]
];

const nonet0 = [null, null, 2, 4, null, null, null, 3, 9];
const nonet7 = [7, null, 5, 4, null, null, null, 3, null];

const row0 = [null, null, 2, 9, 8, null, 5, null, null];
const row7 = [null, 9, 1, 4, null, null, null, null, 5];

const column0 = [null, 4, null, 2, 8, 9, 6, null, null];
const column7 = [null, 1, 7, null, null, 8, 3, null, null];

describe('Test harness - Sudoku solver', ()=>{
  describe('When I execute solve method on Sudoku class', () => {
    test('Then it should return a solved sudoku', ()=> {
      const sudoku = new Sudoku(data);
      const result = sudoku.solve();
      expect(result).toEqual(resultExpected);
    });
  });

  describe('When I execute getNonet method on Sudoku class', () => {
    test('Then it should return a nonet', ()=> {
      const sudoku = new Sudoku(data);
      const result = sudoku.getNonet(0);
      expect(result).toEqual(nonet0);
      const result2 = sudoku.getNonet(7);
      expect(result2).toEqual(nonet7);
    });
  });

  describe('When I execute getRow method on Sudoku class', () => {
    test('Then it should return a row', ()=> {
      const sudoku = new Sudoku(data);
      const result3 = sudoku.getRow(0);
      expect(result3).toEqual(row0);
      const result4 = sudoku.getRow(7);
      expect(result4).toEqual(row7);
    });
  });

  describe('When I execute getColumn method on Sudoku class', () => {
    test('Then it should return a column', ()=> {
      const sudoku = new Sudoku(data);
      const result5 = sudoku.getColumn(0);
      expect(result5).toEqual(column0);
      const result6 = sudoku.getColumn(7);
      expect(result6).toEqual(column7);
    });
  });
});
