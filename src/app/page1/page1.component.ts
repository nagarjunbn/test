import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  plans = [
    {limit: 5, name: '5 IP Plan'},
    {limit: 10, name: '10 IP Plan'}
  ];
  form: FormGroup;
  plan: number;

  constructor(private fb: FormBuilder, private router: Router) {

  }

  //
  // get plan(): string {
  //   return this.form ? this.form.get('plan').value : '';
  // }

  ngOnInit() {
    this.form = new FormGroup({
      plan: new FormControl(this.plan, Validators.required)
    });
  }

  submit() {
    if (this.form.valid) {
      // console.log(this.form.value.plan);
      this.router.navigate(['/page2', {plan: this.form.value.plan}]);
    }
  }
}
