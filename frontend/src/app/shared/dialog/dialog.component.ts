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


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})

export class DialogComponent implements OnInit, OnDestroy {

  @Input() closable = true;
  @Input() modalVisible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  visible: boolean = true;
  breakpoint: number = 520;

  constructor(private router: Router,
              public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
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
}
