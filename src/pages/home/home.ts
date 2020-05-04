import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
  }

  login(){
    //this.navCtrl.push('CategoriasPage');                             //--push é um metodo de empilamento de página que ao chamar uma pagina ela fica sobre a outra.
    this.navCtrl.setRoot('CategoriasPage');
  }
}
