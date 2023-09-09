import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
    HttpClientModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SharedModule { }
