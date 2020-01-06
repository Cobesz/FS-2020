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
        "icon": "view_compact",
        link: '#',
        disabled: true
      },
      {
        "name": "Beer collection",
        "icon": "collections",
        link: '/beercollection',
        disabled: false
      },
      {
        "name": "",
        "icon": "",
        "header": "OTHER STUFF"
      },
      {
        "name": "Other link",
        "icon": "person_pin",
        link: '#',
        disabled: true
      },
    ];


  constructor() {

  }


  ngOnInit() {

  }

}



