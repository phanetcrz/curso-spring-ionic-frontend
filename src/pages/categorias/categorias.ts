import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

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

  items: CategoriaDTO[];  //essa é a lista que será exporta no meu controlador para que o html possa ler os dados

  bucketUrl: String = API_CONFIG.BucketBaseUrl;

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {  //--significa quando a página terminar de ser carregada será executada o que estiver aqui dentro
    this.categoriaService.findAll()  //-- essa é uma chamada assincrona e tem que se inscrever para fazer alguma coisa quando a resposta chegar tem que usar o .subscribe
      .subscribe(response => { //foi utilizada uma função anonima chamada de "arrow function") 
        this.items = response; // Desta forma lhe dá condição de pegar o categoria.html e fazer ele ler a lista de itens "CategoriaDTO[]"
      
      
      //console.log(response) //-- dentro dele, terá que usar uma função "callback" para ser executada quando a resposta chegar    
    }, //caso a requisição der erro 
    error =>{});   
  }

  showProdutos(categoria_id : string){  //poderia ser cat : categoria_id, porem deixou o mesmo nome para fica parametrizado
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id}); //-- forma de passar um valor de parametrso por página, basta incluir um valor no método e 
                                                                     //-- incluir o valor na forma de objeto {} 
                                                                        
  }
}
