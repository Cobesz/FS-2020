import {AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {BeerLockerService} from "../../../core/services/api/beer-locker.service";
import {CdkScrollable, CdkVirtualScrollViewport, ScrollDispatcher} from "@angular/cdk/scrolling";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DialogComponent} from "../../../shared/dialog/dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard',
  templateUrl: './beer-collection.component.html',
  styleUrls: ['./beer-collection.component.scss']
})
export class BeerCollectionComponent implements OnInit, AfterViewInit {

  public beers;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private selectedEntries: object = {};
  public displayedColumns: string[] = ['selectBox', 'name', 'type', 'quantity'];
  private currentPage = 1;
  @Output()
  public clickedBeer = new EventEmitter();


  constructor(private beerLockerService: BeerLockerService,
              public dialog: MatDialog,
              private scrollDispatcher: ScrollDispatcher,
              private zone: NgZone) {
  }

  ngOnInit() {
    this.loadBeers();
  }

  public ngAfterViewInit(): void {
    // this.showScrollIndicator();
  }


  private loadBeers(sortBy: string = null, sortDir = null, reset = false) {
    if (reset) {
      this.currentPage = 1;
    }

    this.beerLockerService.getAll(this.currentPage, 99).subscribe(beers => {
      this.beers = new MatTableDataSource(beers);
      this.beers.paginator = this.paginator;
    });
  }

  public changeRowFocusState(rowData, event, target?) {
    let tr = target || document.getElementById(event.source.id);
    tr = tr.closest('tr');

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

    this.clickedBeer.emit({patientId: rowData.id, isCheckbox: !target});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '45vw',
      disableClose: true,
      panelClass: 'DialogComponent'
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      this.loadBeers();
      // }
    });
  }

}
