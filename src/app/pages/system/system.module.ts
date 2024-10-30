import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

// dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgApexchartsModule } from 'ng-apexcharts';
import { DepartmentComponent } from './department/department.component';

@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    UIModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    NgApexchartsModule,
    NgxDropzoneModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot()
  ]
})

export class SystemModule { }
