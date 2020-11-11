import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:no-import-side-effect
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          console.log(params);
        }
      );
  }
}
