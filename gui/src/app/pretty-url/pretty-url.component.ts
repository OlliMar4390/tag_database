import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pretty-url',
  templateUrl: './pretty-url.component.html',
  styleUrls: ['./pretty-url.component.scss']
})
export class PrettyUrlComponent {

  @Input() urlParts: object;
  
  constructor(  ) { }

}
