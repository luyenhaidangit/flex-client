import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from "../../../core/services/loader.service";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading: boolean = false;
  private loadingSubscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.loadingSubscription = this.loaderService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
