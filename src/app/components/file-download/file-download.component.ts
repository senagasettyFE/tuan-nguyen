import { Component, OnInit, Input, EventEmitter, ElementRef, Output } from '@angular/core';
import * as html2canvas from 'html2canvas';
declare let jsPDF: any;

import { ImageService } from '../../api/image.service';

@Component({
  selector: 'cbre-mie-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss']
})
export class FileDownloadComponent implements OnInit {
  @Input() widgetId: number;
  @Input() clientId?: number;
  @Output() downloadClick: EventEmitter<string> = new EventEmitter<string>();
  isDownloading = false;
  @Input() pngDownload: Boolean = true;
  @Input() dataToDownload?: any;
  @Input()
  servicePlan: any = { clientServicePlan: false, valueDelivered: false };
  servicePlanList: any = [];
  constructor(
    private elementRef: ElementRef,
    private imageService: ImageService
  ) {}

  ngOnInit() {}

  click(button: string) {
    this.downloadClick.emit(button);
  }

  downloadDate() {
    const date = new Date();
    const formattedDate = ('0' + date.getDate()).slice(-2);
    const formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
    const formattedYear = date.getFullYear().toString();
    return formattedMonth + formattedDate + formattedYear;
  }

  clientName() {
    const clientNameNode = document.getElementsByClassName(
      'client__info__name'
    );
    return clientNameNode[0].textContent.replace('arrow_drop_down', '').trim();
  }

  downLoadCanvas(type, fileName) {
    this.isDownloading = true;
    let x = true;
    let parentNode = this.elementRef.nativeElement.parentNode;
    while (x) {
      parentNode = parentNode.parentNode;
      if (parentNode.classList && parentNode.classList.contains('widget')) {
        x = false;
      }
    }
    if (parentNode) {
      const title = parentNode.getElementsByClassName('header')[0].innerText;
      const optionIcons = parentNode.getElementsByClassName(
        'widget-header__options'
      )[0];
      const downloadName =
        this.clientName() +
        '_' +
        title +
        '_' +
        this.downloadDate() +
        '_' +
        '.png';
      optionIcons.style.display = 'none';
      parentNode.style.backgroundColor = 'transparent';
      html2canvas(parentNode, {
        backgroundColor: 'transparent'
      }).then(canvas => {
        if (canvas.msToBlob) {
          // for IE
          const blob = canvas.msToBlob();
          window.navigator.msSaveBlob(blob, downloadName);
        } else {
          const a = document.createElement('a');
          a.href = canvas.toDataURL('image/png');
          // a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
          a.download = downloadName;
          a.click();
        }
        optionIcons.style.display = 'flex';
        parentNode.style.backgroundColor = 'white';

        // Download as PDF
        // const imgData = canvas.toDataURL('image/png');
        // const doc = new jsPDF('p', 'mm');
        // doc.addImage(imgData, 'PNG', 10, 10);
        // doc.save(title + '.pdf');
      });
    }
    setTimeout(() => {
      this.isDownloading = false;
    }, 500);
  }

  excelDownload() {
    const widgetIds = [6, 10, 11, 12];
    if (widgetIds.indexOf(this.widgetId) > -1) {
      return true;
    }
  }

  transformData(type: String, data: any) {
    const mData: any = {
      columns: [],
      rows: [],
      columnStyles: {},
      imgSrc: this.imageService.CLIENT_SERVICE_PLAN_BASE64
    };
    const pdf = new jsPDF('l', 'pt', 'a4');
    // let statuType = type === 'service' ?
    if (type === 'service') {
      mData.columns = [
        'Type',
        'PRIORITY',
        'TIMING',
        'CLIENT OBJECTIVES',
        'CBRE ACTIVITIES/NEXT STEPS',
        'CBRE/CLIENT CONTACTS',
        'STATUS'
      ];
      data.map(item => {
        if (item.status.toLowerCase() !== 'completed') {
          mData.rows.push([
            item.planType,
            item.clientPriority,
            item.fiscalQuarterName
              ? item.fiscalQuarterName
              : '' + ' ' + item.fiscalYear,
            item.clientObjective && item.clientObjective.length > 0
              ? item.clientObjective.replace(/[`’]/g, '\'')
              : item.clientObjective,
            item.cbreActivities,
            item.clientContacts,
            item.status
          ]);
        }
      });
      const colWidth = (pdf.internal.pageSize.getWidth() - 350) / 3;
      mData.columnStyles = {
        text: {
          columnWidth: 'wrap'
        },
        0: { columnWidth: 80 },
        1: { columnWidth: 60 },
        2: { columnWidth: 60 },
        3: { columnWidth: colWidth },
        4: { columnWidth: colWidth },
        5: { columnWidth: colWidth },
        6: { columnWidth: 80 }
        // etc
      };
      mData.imgSrc = this.imageService.CLIENT_SERVICE_PLAN_BASE64;
    }
    if (type === 'account') {
      mData.columns = [
        'CLIENT PRIORITY',
        'TIMING',
        'CLIENT OBJECTIVES',
        'CBRE ACTIVITIES/NEXT STEPS',
        'CLIENT OUTCOMES'
      ];
      data.map(item => {
        if (item.status.toLowerCase() === 'completed') {
          mData.rows.push([
            item.clientPriority,
            item.fiscalQuarterName
              ? item.fiscalQuarterName
              : '' + ' ' + item.fiscalYear,
            item.clientObjective && item.clientObjective.length > 0
              ? item.clientObjective.replace(/[`’]/g, '\'')
              : item.clientObjective,
            item.cbreActivities,
            item.clientOutcomes
          ]);
        }
      });
      const colWidth = (pdf.internal.pageSize.getWidth() - 240) / 3;
      mData.columnStyles = {
        text: {
          columnWidth: 'wrap'
        },
        0: { columnWidth: 100 },
        1: { columnWidth: 60 },
        2: { columnWidth: colWidth },
        3: { columnWidth: colWidth },
        4: { columnWidth: colWidth }
        // etc
      };
      mData.imgSrc = this.imageService.CLIENT_ACCOUNT_PLAN_BASE64;
    }
    return mData;
  }
  downLoadClientServicePDF(type: String) {
    const self = this;
    const data = this.transformData(type, this.dataToDownload.data);
    const pdf = new jsPDF('l', 'pt', 'a4');
    const specialElementHandlers: any = {
      // element with id of "bypass" - jQuery style selector
      '.no-export': function(element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
      }
    };

    pdf.setFont('helvetica');
    pdf.autoTable(data.columns, data.rows, {
      theme: 'grid',
      columnStyles: data.columnStyles,
      styles: { overflow: 'linebreak', columnWidth: 'wrap' },
      createdCell: function(cell, opts) {
        cell.styles.textColor = '#000000';
        if (opts.column.index === 6) {
          if (cell.raw === 'Stalled/Needs Attention') {
            cell.styles.fillColor = '#FF6268';
          }
          if (cell.raw === 'Not Yet Started') {
            cell.styles.fillColor = '#FF0000';
          }
          if (cell.raw === 'On Track') {
            cell.styles.fillColor = '#BEE29B';
          }
          if (cell.raw === 'Limited Progress') {
            cell.styles.fillColor = '#FFEE82';
          }
        }
      },
      drawCell: function(cell, opts) {
        // logic here
      },
      headerStyles: {
        fillColor: '#006A4F'
      },
      margin: { top: 200 },
      addPageContent: function() {
        pdf.setFontSize(10);
        pdf.text(
          'Last Updated: ' + self.dataToDownload.clientInfo.lastUpdated,
          40,
          180
        );
        pdf.setFontSize(16);
        pdf.setTextColor(40);
        pdf.setFontStyle('normal');
        pdf.text('Account Director:', 40, 150);
        pdf.setFontSize(24);
        const splitTitle = pdf.splitTextToSize(
          self.dataToDownload.clientInfo.clientName,
          pdf.internal.pageSize.getWidth() / 2 - 20
        );
        // 	doc.text(15, 20, splitTitle);
        pdf.text(splitTitle, pdf.internal.pageSize.getWidth() / 2 - 100, 150);
        pdf.addImage(data.imgSrc, 'JPEG', 0, 0, 900, 100);
        pdf.setFontSize(10);
        pdf.setFontStyle('normal');
        const str = 'Page ' + pdf.internal.getNumberOfPages();
        // str = str + ' of ' + totalPagesExp;
        pdf.text(
          str,
          pdf.internal.pageSize.getWidth() / 2 - 20,
          pdf.internal.pageSize.getHeight() - 10
        );
      }
    });
    const typeName =
      type === 'service' ? 'Client Service Plan' : 'Value Delivered document';
    const downloadName =
      self.dataToDownload.clientInfo.clientName +
      ' ' +
      typeName +
      ' ' +
      this.downloadDate();
    pdf.save(downloadName + '.pdf');
  }
}
