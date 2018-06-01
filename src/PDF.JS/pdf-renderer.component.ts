import { Component, ViewChild, OnInit, Input, Output } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { MatIconModule } from '@angular/material';
import { saveAs } from 'file-saver';

import 'hammerjs';
import 'rxjs/Rx' ;

@Component({
  selector: 'pdf-renderer',
  templateUrl: 'pdf-renderer.component.html',
  styleUrls: ['./pdf-renderer.component.css']
})

export class PdfRenderer implements OnInit {
  private options: RequestOptions;
  private pdfSrc : any;
  private zoom : number;
  private _zoomPercentage : string;
  private pageNumber : number;
  private showAll : boolean;
  private isLoaded: boolean;
  private totalPages: number;

  private spinner : boolean = false;

  private choiceLocal : boolean;
  private PDFLoaded : boolean = true;

  ngOnInit(){
    this.options = new RequestOptions({responseType: ResponseContentType.Blob });
    this.zoom = 1;
    this.pageNumber = 1;
    this.isLoaded = false;
    this.zoomPercentage = '100'
  }
  
  constructor(private http : Http)
  {    
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
    this.spinner = false;
  }

  chooseType(index: number) {
    this.isLoaded = false;
    if(index == 1) this.choiceLocal = true;
    else if (index == 2) this.choiceLocal = false;
  }

  // service Call - Getting a document to render it on browser.
  getData(url : string) {
      this.spinner = true;
      return this.http.get(url, this.options)
      .subscribe(pdf => { this.pdfSrc = pdf; }, error => {   this.spinner = false; alert('Wrong url!!!');});
  }

  // Getting local PDF document.
  onFileSelected() {
    let $img: any = document.querySelector('#file');
   
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
   
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };
   
      reader.readAsArrayBuffer($img.files[0]);
    }
  }

  // Zoom - This setter and getter are for showing percentage in the zoom form.
  get zoomPercentage(): string {    
    return this._zoomPercentage;
  }

  set zoomPercentage(newName: string) {
    if(newName != '')
    {
      newName = newName.replace('%', '');
      var newZoom = parseInt(newName, 10)/100;
      this.zoom = newZoom;
      this._zoomPercentage = newName + '%';
    }
  }

  // Zoom
  incrementZoom(i : number) {
    if(this.zoom + i <= 0)
    {
      this.zoom = 0;
      return;
    }
    this.zoom = this.zoom + i;
    this.zoom = Math.round(this.zoom*10)/10;
    this.zoomPercentage = (Math.round(this.zoom*100)).toString();
  }

  // Pagination
  nextPage()      { this.pageNumber++; }
  previousPage()  { this.pageNumber--; }
  
  // Downloading rendered pdf Document to your local machine
  download() {
    var blob = new Blob([this.pdfSrc.blob()], { type: 'application/pdf' });
    saveAs(blob, 'data.pdf');
  }

  // Print
  printPDF() {
    var file = new Blob([this.pdfSrc.blob()], {type: 'application/pdf'});
    var fileURL = window.URL.createObjectURL(file);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = fileURL;
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
  }

}

