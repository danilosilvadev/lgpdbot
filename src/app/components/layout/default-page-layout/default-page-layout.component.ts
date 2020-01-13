import { Component, OnInit } from '@angular/core';
import { faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-default-page-layout',
  templateUrl: './default-page-layout.component.html',
  styleUrls: ['./default-page-layout.component.scss']
})
export class DefaultPageLayoutComponent implements OnInit {
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  faUserCircle = faUserCircle;
  
  constructor() { }

  ngOnInit() {
  }

}
