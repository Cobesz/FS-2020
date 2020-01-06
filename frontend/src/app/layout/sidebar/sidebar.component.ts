import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  private sidebarmenuItems: Array<object> =
    [
      {
        "name": "Dashboard",
        "icon": "view_compact"
      },
      {
        "name": "Beer collection",
        "icon": "collections"
      },
      {
        "name": "",
        "icon": "",
        "header": "OTHER STUFF"
      },
      {
        "name": "Other link",
        "icon": "person_pin"
      },
    ];


  constructor() {

  }


  ngOnInit() {

  }

}



