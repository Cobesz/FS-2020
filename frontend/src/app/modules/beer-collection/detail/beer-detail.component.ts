import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BeerLockerService} from "../../../core/services/api/beer-locker.service";
import {DialogComponent} from "../../../shared/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EditDialogComponent} from "../../../shared/edit-dialog/edit-dialog.component";
import {DeleteDialogComponent} from "../../../shared/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent implements OnInit {

  public beer;
  private beerId;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private beerLockerService: BeerLockerService,) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      console.log(this.route);
      console.log(this.router);
      this.beerId = params.id;
      this.loadBeer(this.beerId);
    });
  }

  private loadBeer(beerId) {
    this.beerLockerService.getOne(beerId).subscribe(beer => {
      this.beer = beer;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '45vw',
      disableClose: true,
      panelClass: 'EditDialogComponent',
      data: {
        id: this.beerId,
        beer: this.beer,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadBeer(this.beerId);
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25vw',
      disableClose: true,
      panelClass: 'DeleteDialogComponent',
      data: {
        id: this.beerId,
        beer: this.beer,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/beercollection']);
    });
  }
}
