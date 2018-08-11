import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cbre-mie-source-updated',
  templateUrl: './source-updated.component.html',
  styleUrls: ['./source-updated.component.scss']
})
export class SourceUpdatedComponent implements OnInit {

  @Input() source;
  @Input() updated;
  @Input() webEdit;

  constructor() { }

  ngOnInit() {
  }

  splitPipe(value) {
    if (!value) {
      return;
    }
    value = value.replace(/(,)/g, '\n');
    return value;
  }

}
