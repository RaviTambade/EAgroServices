import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { CorporateService } from '../corporate.service';
import { Corporate } from '../corporate';
import { Corporation } from '../corporation';

@Directive({
  selector: '[appCorporatedetails]'
})
export class CorporatedetailsDirective {
corporate:Corporation|any;
private toolTipElement:HTMLElement;
  constructor(private crpSvc:CorporateService,private el:ElementRef,private renderer:Renderer2) { 
    this.toolTipElement = document.createElement('td');
  }
@HostListener('mouseover') onMouseEnter(){
  const companyName=this.el.nativeElement.innerText;
  this.crpSvc.getCorporateByName(companyName).subscribe((corporate)=>{
    console.log(corporate)
   this.showtoolTip(corporate)
    
  })
}
@HostListener('mouseleave') onMouseLeave() {
  this.toolTipElement.remove();
  }

showtoolTip(corporate:Corporation){
  this.toolTipElement=  this.renderer.createElement("td");
  this.toolTipElement.className="tooltip"
  const content = `
  <h3>${corporate.name}</h3>
  <p>${corporate.email}</p>
  <p>${corporate.contactNumber}</p>
`;

this.toolTipElement.innerHTML = content;
this.renderer.appendChild(document.body, this.toolTipElement);
}
}
