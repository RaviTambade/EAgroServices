import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { CorporateService } from '../Services/corporate.service';
import { CorporationDetails } from '../Models/corporation-details';


@Directive({
  selector: '[appCorporatedetails]'
})
export class CorporatedetailsDirective {
corporate:CorporationDetails|any;
private tooltipElement:HTMLElement |null =null;
constructor(
  private crpSvc: CorporateService,
  private el: ElementRef,
  private renderer: Renderer2
) {
}

@HostListener('mouseover', ['$event']) onMouseEnter(event: MouseEvent) {
  if (this.tooltipElement==null) {
  const companyName = this.el.nativeElement.innerText;
  this.crpSvc.getCorporateByName(companyName).subscribe((corporate) => {
    this.corporate=corporate
    this.showTooltip(event);
  });
}
}

@HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
  if (this.tooltipElement) {
  this.updateTooltipPosition(event);
  }
}

@HostListener('mouseleave') onMouseLeave() {
  this.hideTooltip();
}

private updateTooltip(corporate: CorporationDetails) {
  const content = `
    <h3>${corporate.name}</h3>
    <p>${corporate.email}</p>
    <p>${corporate.contactNumber}</p>
  `;
  if (this.tooltipElement) 
  this.tooltipElement.innerHTML = content;
}

private updateTooltipPosition(event: MouseEvent) {
  const xOffset = 10; // Adjust as needed
  const yOffset = 20; // Adjust as needed

  this.renderer.setStyle(this.tooltipElement, 'left', event.clientX + xOffset + 'px');
  this.renderer.setStyle(this.tooltipElement, 'top', event.clientY + yOffset + 'px');
}

private showTooltip(event:MouseEvent) {
  if (!this.tooltipElement) {
    this.tooltipElement = document.createElement('div');
  this.renderer.setStyle(this.tooltipElement, 'border', '1px solid red');
  this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
  this.renderer.setStyle(this.tooltipElement, 'background-color', 'black');
  this.renderer.setStyle(this.tooltipElement, 'color', 'white');
  this.renderer.setStyle(this.tooltipElement, 'padding', '8px');
  this.renderer.setStyle(this.tooltipElement, 'border-radius', '4px');
  this.renderer.setStyle(this.tooltipElement, 'box-shadow', '0 2px 4px rgba(0, 0, 0, 0.1)');
  this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
  this.renderer.appendChild(document.body, this.tooltipElement);
  this.updateTooltipPosition(event);
  this.updateTooltip(this.corporate);
}
}

private hideTooltip() {
  if (this.tooltipElement) {
    this.renderer.removeChild(document.body, this.tooltipElement);
    this.tooltipElement = null; 
  }
}
}