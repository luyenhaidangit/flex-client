import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';
import { STATUS_INFO } from './department.constant';

@Component({
  selector: 'app-bloglist',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  // Ui
  breadCrumbItems: Array<{}>;
  items: any = [];

  constructor(private systemService: SystemService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Quản trị hệ thống' }, { label: 'Quản lý phòng ban', active: true }];
    this.getItems({});
  }

  // Data
  getItems(request: any){
    this.systemService.searchDepartments(request).subscribe((result: any) => {
      if(result.isSuccess){
        this.items = result.data.items;
      }
    });
  }

  getStatusText(status: number): string {
    return STATUS_INFO[status]?.text || 'Unknown';
  }

  getStatusClass(status: number): string {
    return STATUS_INFO[status]?.class || '';
  }
}
