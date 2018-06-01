import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { PdfRenderer } from 'src/PDF.JS/pdf-renderer.component';
import { MaterialModule } from '../shared/material.module'; 


@NgModule({
  declarations: [
    AppComponent,
    PdfRenderer
  ],
  imports: [
    HttpModule,
    BrowserModule,
    PdfViewerModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
