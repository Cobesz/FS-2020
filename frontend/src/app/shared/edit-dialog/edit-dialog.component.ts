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
  templateUrl: 'edit-dialog.component.html',
  styleUrls: ['edit-dialog.component.scss']
})

export class EditDialogComponent implements OnInit, OnDestroy {

  @Input() closable = true;
  @Input() modalVisible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  visible: boolean = true;
  breakpoint: number = 520;

  public generalFormGroup: FormGroup;

  public type = [{
    value: 'pils',
    display: 'Pils'
  }, {
    value: 'blond',
    display: 'Blond'
  }, {
    value: 'dubbel',
    display: 'Dubbel'
  }, {
    value: 'tripple',
    display: 'Tripple'
  }, {
    value: 'trappist',
    display: 'Trappist'
  }, {
    value: 'ipa',
    display: 'IPA'
  }];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditDialogComponent>,
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

    console.log(this.data);

    this.generalFormGroup = this.formBuilder.group({
      title: [this.data.beer.title, Validators.required],
      type: [this.data.beer.type, Validators.required],
      quantity: [this.data.beer.quantity, Validators.required],
    });
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
    const title = this.generalFormGroup.get('title').value;
    const type = this.generalFormGroup.get('type').value;
    const quantity = this.generalFormGroup.get('quantity').value;
    this.beerLockerService.editBeer(this.data.id, title, type, quantity).subscribe(beer => {
      if (beer) {
        this.dialogRef.close()
      }
    })
  }
}
