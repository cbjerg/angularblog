import { Component, OnInit } from '@angular/core';
import { DeviceDiscoveryService } from './shared/device-discovery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  istabletorphone = false;
  rightstyle;
  rightstyle2;

  constructor(
      private deviceDiscoveryService: DeviceDiscoveryService
  ){}

   ngOnInit() {
    if (this.deviceDiscoveryService.deviceIsPhone() || this.deviceDiscoveryService.deviceIsTablet()){
      this.istabletorphone = true;
    }else{
            this.rightstyle = {
            'margin-left': '200px'
          };
          this.rightstyle2= {
            'margin-left': '210px'
          };
    }
  }
}
