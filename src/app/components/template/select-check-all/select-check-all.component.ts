// import { Component, OnInit, Input } from '@angular/core';
// import { NgModel, FormControl } from '@angular/forms';
// import { MatCheckboxChange } from '@angular/material/checkbox';
// import { Seed } from 'src/model/seed.model';

// @Component({
//   selector: 'app-select-check-all',
//   templateUrl: './select-check-all.component.html',
//   styleUrls: ['./select-check-all.component.css']
// })
// export class SelectCheckAllComponent implements OnInit {


//   @Input() model: FormControl;
//   @Input() values:Seed[];
//   @Input() text = 'Select All';

//   constructor() { }

//   ngOnInit(): void {
//   }

//   isChecked(): boolean {
//     return this.model.value && this.values.length
//       && this.model.value.length === this.values.length;
//   }

//   isIndeterminate(): boolean {
//     return this.model.value && this.values.length && this.model.value.length
//       && this.model.value.length < this.values.length;
//   }

//   toggleSelection(change: MatCheckboxChange): void {
//     if (change.checked) {

//       const result = this.values.map(obj => obj.id);

//       this.model.setValue(result);
//     } else {
//       this.model.setValue([]);
//     }
//   }

// }

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';
import { Researcher } from 'src/model/researcher.model';
 
@Component({
  selector: 'app-select-check-all',
  templateUrl: "./select-check-all.component.html",
  styleUrls: ['./select-check-all.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectCheckAllComponent {
  @Input() model: FormControl;
  @Input() values :Researcher[]=[];
  @Input() text = 'Select All'; 
 
  isChecked(): boolean {
    return this.model.value && this.values.length
      && this.model.value.length === this.values.length;
  }
 
  isIndeterminate(): boolean {
    return this.model.value && this.values.length && this.model.value.length
     && this.model.value.length < this.values.length;
  }
 
  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      const result = this.values.map(v => v.id);
      this.model.setValue(result);
    } else {
      this.model.setValue([]);
    }
  }
}
