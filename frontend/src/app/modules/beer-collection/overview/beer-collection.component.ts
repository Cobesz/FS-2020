import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './beer-collection.component.html',
  styleUrls: ['./beer-collection.component.scss']
})
export class BeerCollectionComponent implements OnInit {

  public requests = new MatTableDataSource([{
    id: 1,
    date: Date(),
    type: 'Test type',
    status: 'Test Status',
  }]);


  private selectedEntries: object = {};

  public displayedColumns: string[] = ['selectBox', 'importDate', 'type', 'status'];

  constructor() {
  }

  ngOnInit() {
    console.log(this.requests);
  }

  public changeRowFocusState(rowData, event) {

    const tr = document.getElementById(event.source.id).closest('tr'); // Finding the correct element based on ID from the event

    if (this.selectedEntries.hasOwnProperty(rowData.id)) {
      delete this.selectedEntries[rowData.id];
    } else {
      this.selectedEntries[rowData.id] = true;
    }

    if (event.checked) {
      tr.className = 'selectedRow mat-row ng-star-inserted'; // give it the correct selectedRow class for styling
      tr.className = 'selectedRow mat-row ng-star-inserted'; // give it the correct selectedRow class for styling
    } else {
      tr.className = 'mat-row ng-star-inserted'; // remove the selectedRow class
    }
  }

}
