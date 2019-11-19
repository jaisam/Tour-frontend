import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `<div class="alert" [ngClass]= "type ==='success' ? 'alert--success' : 'alert--error'" >
            {{ msg }}
            </div>`,
  styles: [`
    .alert {
      position: fixed;
      top: 0;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      z-index: 9999;
      color: #fff;
      font-size: 1.8rem;
      font-weight: 400;
      text-align: center;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 1.6rem 15rem;
      -webkit-box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.25);
      box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.25);
    }

    .alert--success {
      background-color: #20bf6b;
    }

    .alert--error {
      background-color: #eb4d4b;
    }
  `]
})
export class AlertComponent implements OnInit {

  @Input() type;
  @Input() msg;
  // @ViewChild('alert', { static: false, read: ViewContainerRef }) entry: ViewContainerRef;


  constructor(
    // private resolver: ComponentFactoryResolver
    ) { }

  ngOnInit() {
  }

  // createComponent(type, msg) {
  //   this.entry.clear();
  //   const factory = this.resolver.resolveComponentFactory(AlertComponent);
  //   let componentRef = this.entry.createComponent(factory);
  //   componentRef.instance.type = type;
  //   componentRef.instance.msg = msg;
  // }
}

