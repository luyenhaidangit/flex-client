import { Component, OnInit } from '@angular/core';
import { LoaderService } from "../../../core/services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loading: boolean = true;

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoader.subscribe((v) => {
      setTimeout(() => {
        this.loading = v;
      }, 500);     
    });
  }
  
  ngOnInit(): void {
  }

}
