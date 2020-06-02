import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDto } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDto[];  //--ProdutoDto coleção

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,  //-- através do NavParams que é possível obter os dados vindo da navegação
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {                       //pegar o id que veio lá da navegação
    let categoria_id = this.navParams.get('categoria_id'); // categoria_id que vem do categorias.ts categoria_id linha 43
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {           //--response paginado
        this.items = response['content'];//--nesse caso, o formato Json está dentro do content
      },
      error =>{});  
  };

}
