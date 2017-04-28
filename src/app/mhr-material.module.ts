import { NgModule, Optional, SkipSelf } from '@angular/core';

import {
  MdInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MdInputModule
  ],
  exports: [
    MdInputModule
]
})
export class MhrMaterialModule { }
