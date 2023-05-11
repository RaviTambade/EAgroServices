// Angular import
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// project import
import { NavigationItem } from '../../navigation';
import { animate, style, transition, trigger } from '@angular/animations';
import { BerryConfig } from 'src/app/app-config';

@Component({
  selector: 'app-nav-collapse',
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', display: 'block' }),
        animate('250ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [animate('250ms ease-in', style({ transform: 'translateY(-100%)' }))])
    ])
  ]
})
export class NavCollapseComponent implements OnInit {
    // public props
    @Output() toggle: EventEmitter<any> = new EventEmitter();
    @Input() item!: NavigationItem;

    visible;
    themeLayout: string;
    windowWidth: number;

    // Constructor
    constructor() {
      this.visible = false;
      this.themeLayout = BerryConfig.layout;
      this.windowWidth = window.innerWidth;
    }

    // Life cycle events
    ngOnInit() {}

    // public method
    navCollapse(e: any) {
      this.visible = !this.visible;

      let parent = e.target;
      if (this.themeLayout === 'vertical') {
        parent = parent.parentElement;
      }

      const sections = document.querySelectorAll('.coded-hasmenu');
      for (let i = 0; i < sections.length; i++) {
        if (sections[i] !== parent) {
          sections[i].classList.remove('coded-trigger');
        }
      }

      let first_parent = parent.parentElement;
      let pre_parent = parent.parentElement.parentElement;
      if (first_parent.classList.contains('coded-hasmenu')) {
        do {
          first_parent.classList.add('coded-trigger');
          first_parent = first_parent.parentElement.parentElement.parentElement;
        } while (first_parent.classList.contains('coded-hasmenu'));
      } else if (pre_parent.classList.contains('coded-submenu')) {
        do {
          pre_parent.parentElement.classList.add('coded-trigger');
          pre_parent = pre_parent.parentElement.parentElement.parentElement;
        } while (pre_parent.classList.contains('coded-submenu'));
      }
      parent.classList.toggle('coded-trigger');
    }
}
