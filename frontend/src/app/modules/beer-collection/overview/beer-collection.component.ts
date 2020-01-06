import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {BeerLockerService} from "../../../core/services/api/beer-locker.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './beer-collection.component.html',
  styleUrls: ['./beer-collection.component.scss']
})
export class BeerCollectionComponent implements OnInit {

  public beers;


  private selectedEntries: object = {};

  public displayedColumns: string[] = ['selectBox', 'importDate', 'type', 'status'];

  constructor(private beerLockerService: BeerLockerService) {
  }

  ngOnInit() {

    this.beerLockerService.getAll().subscribe(beers => {
      console.log(beers);

      this.beers = new MatTableDataSource(beers);
    })


  }

  private loadBeers() {

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
