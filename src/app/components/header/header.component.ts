import { Component, OnInit } from '@angular/core';
import { faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  faUserCircle = faUserCircle;

  constructor() { }

  ngOnInit() {
  }

}
