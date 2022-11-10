import { Component, OnInit } from '@angular/core';
import { COLUMNS, Column } from '../models/column';


@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {

  columns = COLUMNS;
  enteredColumns: Column[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadDataFromLocalStorage();
  }

  /*if (this.enteredColumns?.length < 3) {
      if (this.columns[findedColumn].isTrusted) {
        this.saveOrderOfColumns(this.columns[findedColumn]);
      }
    }
    if (!this.columns[findedColumn].isTrusted) {
      this.deleteEnteredColumn(this.columns[findedColumn]);
    }
    this.saveDataToLocalStorage();
    */

  public onSaveColumnTypeChanged(column: Column) {
    const findedColumn = this.findIndexOfColumn(column);
    this.columns[findedColumn].isTrusted = !column.isTrusted;
  }
  private saveOrderOfColumns(column: Column) {
    this.enteredColumns?.push(column);
  }
  private deleteEnteredColumn(column: Column) {
    const findedColumn = this.findIndexOfColumn(column);
    if (findedColumn !== -1) {
        this.enteredColumns.splice(findedColumn, 1);
    }
  }

  private findIndexOfColumn(column: Column) {
    return this.columns.findIndex(col => col === column);
  }
  private saveDataToLocalStorage() {
    localStorage.setItem("columns", JSON.stringify(this.columns));
    localStorage.setItem("enteredColumns", JSON.stringify(this.enteredColumns));
  }
  private loadDataFromLocalStorage() {
    this.columns = JSON.parse(localStorage.getItem("columns") || "[]");
    this.enteredColumns = JSON.parse(localStorage.getItem("enteredColumns") || "[]");
  }
}
