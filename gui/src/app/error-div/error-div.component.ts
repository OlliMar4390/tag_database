import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-div',
  templateUrl: './error-div.component.html',
  styleUrls: ['./error-div.component.scss']
})
export class ErrorDivComponent implements OnInit {

  @Input() errMess: string;
  constructor() { }

  ngOnInit(): void {
  }

}
