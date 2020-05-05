import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {  //--significa quando a página terminar de ser carregada será executada o que estiver aqui dentro
    this.categoriaService.findAll()  //-- essa é uma chamada assincrona e tem que se inscrever para fazer alguma coisa quando a resposta chegar tem que usar o .subscribe
      .subscribe(response => { //foi utilizada uma função anonima chamada de "arrow function") 
      console.log(response) //-- dentro dele, terá que usar uma função "callback" para ser executada quando a resposta chegar    
    }, //caso a requisição der erro 
    error =>{
      console.log(error)
    });   
  }
}
