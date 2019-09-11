import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm} from '@angular/forms';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  plan: number;

  constructor(private fb: FormBuilder) {
  }

  ipForm: FormGroup;

  ngOnInit() {
    this.plan = 5;
    this.ipForm = this.fb.group({
      address: this.fb.array([this.fb.group({
        ip: ['', Validators.pattern('^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]})
      ])
    });
  }


  get ipArray() {
    return this.ipForm.get('address') as FormArray;
  }

  addIP() {
    if (this.ipArray.length != this.plan) {
      this.ipArray.push(this.fb.group({
        ip: ['', Validators.pattern('^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]}));
    }
  }

  getValidity(rowIndex) {
    return (<FormArray>this.ipForm.get('address')).controls[rowIndex].invalid;
  }

  deleteIP(rowIndex) {
    if (this.ipArray.length == 1) {
      this.ipForm.reset();
    } else {
      this.ipArray.removeAt(rowIndex);
    }
  }

  submit() {
    if (this.ipForm.valid) {
      const validIPs = this.ipForm.value.address;
      validIPs.forEach((obj, index) => {
        if (obj.ip == null || obj.ip == '') {
          console.log(this.ipArray.length);
          // if (this.ipArray.length === 1) {
          //   console.log('reset');
          //   this.ipForm.reset();
          // } else {
          //   console.log('remove');
          //   this.ipArray.removeAt(index);
          // }
        }
      });
      console.log(validIPs);
      // const validIPs = this.ipForm.value.address.filter(function (obj) {
      //   if (obj.ip != null && obj.ip != '') {
      //     return obj;
      //   }
      // });
      localStorage.setItem('address', JSON.stringify(this.ipForm.value.address));
    }
  }
}
