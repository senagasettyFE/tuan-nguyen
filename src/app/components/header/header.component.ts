import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'cbre-mie-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name = `Stephen Negron`;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }
}
