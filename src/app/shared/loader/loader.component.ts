import { Component, OnInit } from '@angular/core';
import { finalize, takeUntil } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  visible: boolean;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    // Visible
    this.loaderService.visible
      .pipe(finalize(() => {
      }))
      .subscribe((visible) => {
        this.visible = visible;
      });
  }

}
