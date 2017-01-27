import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  private buttonHover: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() { }


  selectSubject(event: any) {
    debugger;
    window.setTimeout(() => {

      switch (event.id) {

        case "btn.bwl":
          this.router.navigate(['app-question/bwl'])
          break;
        case "btn.its":
          this.router.navigate(['app-question/its'])
          break;
        case "btn.wi":
          this.router.navigate(['app-question/wi'])
          break;
        default:
      }
    }, 500)
  }
}

