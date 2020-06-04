import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDto } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDto;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService : ProdutoService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');   //pertinente ao id enviado na navegação, conforme consta em produto.html linha 12 "(click)="showDetail(item.id)"
    this.produtoService.findById(produto_id)
    .subscribe(response =>{
      this.item= response;
      this.getImageUrlIfExists(); //--Chama o método para carregar as url das imagens
    },
    error => {});
  }

  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id)  //faz a requisição para verificar se a imagem existe no bucket da amazon
      .subscribe(response =>{                             //após se inscrever e se a resposta vir com sucesso significa que a imagem existe lá no bucket 
        this.item.imageUrl = `${API_CONFIG.BucketBaseUrl}/prod${this.item.id}.jpg` // monta a url com o nome padrão ex:prod1        
      },
      error => {});
  }

}