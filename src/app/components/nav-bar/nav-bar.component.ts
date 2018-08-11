import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Sidenav } from '../../viewmodels/sidenav';

@Component({
  selector: 'cbre-mie-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  sideNavList: Sidenav[];
  @Input() clientId;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.sideNavList = [];
    this.getActiveClass();
  }

  click(sideNav: Sidenav) {
    if (sideNav.itemId === 1) {
      if (this.activatedRoute.snapshot.params && this.activatedRoute.snapshot.params.parentClientId) {
        this.router.navigate([`/dashboard/${this.activatedRoute.snapshot.params.parentClientId}`]);
      } else {
        this.router.navigate([`/dashboard`]);
      }
    } else if (sideNav.itemId === 3) {
      this.router.navigate([`/usermanagement`]);
    }
  }

  getActiveClass() {
    let itemId: number;
    if (this.activatedRoute.snapshot.url[0] && this.activatedRoute.snapshot.url[0].path === 'usermanagement') {
      itemId = 3;
    } else {
      itemId = 1;
    }
    this.sideNavList.forEach(item => {
      if (itemId === item.itemId) {
        item.active = 'active';
      } else {
        item.active = '';
      }
    });
  }

}
