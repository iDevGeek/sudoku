class Sudoku {
  constructor(nonets) {
    this.nonets = JSON.parse(JSON.stringify(nonets));
  }

  solve() {
    let unsolved = true;
    while (unsolved) {
      unsolved = false;
      this.nonets.forEach((nonet, nonetRowIndex) => {
        nonet.forEach((item, nonetColumnIndex) => {
          let possibleValues;
          if (item === null) {
            const possibleInNonet = this.getNonetPossibleValues(nonet, nonetRowIndex, nonetColumnIndex);
            possibleValues = this.getRowAndColumnPossibleValues(possibleInNonet, nonet, nonetRowIndex, nonetColumnIndex);
          } else if (typeof item === "object") {
            possibleValues = this.getRowAndColumnPossibleValues(item, nonet, nonetRowIndex, nonetColumnIndex);            
          }
          let valueToSave = possibleValues;
          if (typeof possibleValues === "object" && possibleValues.length === 1) {
            valueToSave = possibleValues[0];
          } else if (valueToSave) {
            unsolved = true;
          }
          valueToSave && this.setNonetItem(nonetRowIndex, nonetColumnIndex, valueToSave);
        })
      });
    }
    return this.nonets;
  }

  getRowNumberFromNonetIndex(nonetRowIndex, nonetColumnIndex) {
    const baseRowIndex = Math.floor(nonetRowIndex/3)*3;
    const offsetRowIndex = Math.floor(nonetColumnIndex/3);
    return baseRowIndex + offsetRowIndex;
  }

  getColumnNumberFromNonetIndex(nonetRowIndex, nonetColumnIndex) {
    const baseColumnIndex = (nonetRowIndex%3)*3;
    const offsetColumnIndex = nonetColumnIndex%3;
    return baseColumnIndex + offsetColumnIndex;
  }

  getNonetPossibleValues(nonet, nonetRowIndex, nonetColumnIndex) {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return values.filter((val)=> {
      return (nonet.indexOf(val) === -1);
    });
  }

  getRowAndColumnPossibleValues(possibleInNonet, nonet, nonetRowIndex, nonetColumnIndex) {
    const rowNumber = this.getRowNumberFromNonetIndex(nonetRowIndex, nonetColumnIndex);
    const row = this.getRow(rowNumber);
    const possibleInRow = possibleInNonet.filter((val)=> {
      return (row.indexOf(val) === -1);
    });
    const columnNumber = this.getColumnNumberFromNonetIndex(nonetRowIndex, nonetColumnIndex);
    const column = this.getColumn(columnNumber);
    const possibleInColumn = possibleInRow.filter((val)=> {
      return (column.indexOf(val) === -1);
    });
    return possibleInColumn;
  }

  setNonetItem(nonetNumber, index, value) {
    this.nonets[nonetNumber][index] = value;
  }

  getNonet(nonetNumber = 0) {
    return this.nonets[nonetNumber];
  }

  getRow(rowNumber = 0) {
    const arrayStart = Math.floor(rowNumber/3)*3;
    const offsetStart = rowNumber*3 - arrayStart*3;
    const r1 = this.nonets[arrayStart].slice(offsetStart, offsetStart+3);
    const r2 = this.nonets[arrayStart+1].slice(offsetStart, offsetStart+3);
    const r3 = this.nonets[arrayStart+2].slice(offsetStart, offsetStart+3);
    return [].concat(r1, r2, r3);
  }

  getColumn(columnNumber = 0) {
    const columnStart = Math.floor(columnNumber/3);
    const nonets = [this.getNonet(columnStart), this.getNonet(columnStart+3), this.getNonet(columnStart+6)];
    const offsetStart = columnNumber%3;
    const result = [];
    for (let counter = 0; counter < 3; counter++) {
      for (let i = 0; i < 3; i++) {
        result.push(nonets[counter][offsetStart+(i*3)]);
      }
    }
    return result;
  }
}

module.exports.Sudoku = Sudoku;
