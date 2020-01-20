import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnDestroy,
  Inject
} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BeerLockerService} from "../../core/services/api/beer-locker.service";


@Component({
  selector: 'app-dialog',
  templateUrl: 'delete-dialog.component.html',
  styleUrls: ['delete-dialog.component.scss']
})

export class DeleteDialogComponent implements OnInit, OnDestroy {

  @Input() closable = true;
  @Input() modalVisible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  visible: boolean = true;
  breakpoint: number = 520;

  public generalFormGroup: FormGroup;


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<DeleteDialogComponent>,
              private beerLockerService: BeerLockerService,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    const w = window.innerWidth;
    if (w >= this.breakpoint) {
      this.visible = true;
    } else {
      // whenever the window is less than 520, hide this component.
      this.visible = false;
    }
  }

  ngOnDestroy(): void {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const w = event.target.innerWidth;
    if (w >= this.breakpoint) {
      this.visible = true;
    } else {
      // whenever the window is less than 520, hide this component.
      this.visible = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.beerLockerService.deleteBeer(this.data.id).subscribe(beer => {

      this.dialogRef.close()
      
    })
  }
}
