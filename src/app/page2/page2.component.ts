import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  plan: number;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
  }

  ipForm: FormGroup;

  ngOnInit() {
    this.plan = Number(this.activatedRoute.snapshot.paramMap.get('plan'));
    this.ipForm = this.fb.group({
      address: this.fb.array([this.fb.group({
        ip: ['', Validators.pattern('^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]
      })
      ])
    });
  }


  get ipArray() {
    return this.ipForm.get('address') as FormArray;
  }

  addIP() {
    if (this.ipArray.length != this.plan) {
      this.ipArray.push(this.fb.group({
        ip: ['', Validators.pattern('^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]
      }));
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
      const validIPs = this.ipForm.value.address.filter(function (obj) {
        if (obj.ip != null && obj.ip != '') {
          return obj;
        }
      });
      // console.log(validIPs);
      // // const validIPs = this.ipForm.value.address;
      // // this.ipForm.value.address.forEach((obj, index) => {
      // //   if (obj.ip == null || obj.ip == '') {
      // //     if (this.ipArray.length === 1) {
      // //       // console.log(this.ipForm.value.address);
      // //       this.ipForm.reset();
      // //     } else {
      // //       // console.log(this.ipForm.value.address);
      // //       this.ipArray.removeAt(index);
      // //     }
      // //   }
      // // });
      this.removeBlank();
      this.removeBlank();
      this.removeBlank();
      this.removeBlank();
      this.removeBlank();
      alert('data saved to local storage');
      localStorage.setItem('address', JSON.stringify(validIPs));
    }
  }

  removeBlank() {
    this.ipForm.value.address.forEach((obj, index) => {
      if (obj.ip == null || obj.ip == '') {
        if (this.ipArray.length === 1) {
          // console.log(this.ipForm.value.address);
          this.ipForm.reset();
        } else {
          // console.log(this.ipForm.value.address);
          this.ipArray.removeAt(index);
        }
      }
    });
  }
}
