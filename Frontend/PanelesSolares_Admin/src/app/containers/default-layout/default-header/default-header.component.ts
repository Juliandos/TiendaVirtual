import { Component, Input } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms'; 

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService) {
    super();
  }

  logout(){
    localStorage.removeItem('access_token');
    localStorage.setItem('logged', false.toString()); // Método 1
    // localStorage.setItem('logged', '' + false); // Método 2
    localStorage.removeItem('persona_email');
  }
}
