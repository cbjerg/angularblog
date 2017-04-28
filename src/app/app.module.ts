import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { BlogService } from './shared/blog.service';
import { BlogListResolver } from './blog/blog-list-resolver.service';
import { appRoutes } from './routes';
import { ModalComponent } from './shared/modal.directive';
import { ModalService } from './shared/modal.service';
import { DeviceDiscoveryService } from './shared/device-discovery.service';
import { MhrMaterialModule } from './mhr-material.module';
@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MhrMaterialModule
  ],
  providers: [BlogService, BlogListResolver, ModalService, DeviceDiscoveryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
