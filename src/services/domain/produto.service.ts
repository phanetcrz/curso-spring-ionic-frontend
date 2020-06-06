import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findById(produto_id : string) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
  }                  //Get do tipo ProdutoDTO


  findByCategoria(categoria_id : string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  getSmallImageFromBucket(id : String) : Observable<any>{    //--imagem pequena
    let url = `${API_CONFIG.BucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url,{responseType : 'blob'});
  }
  
  getImageFromBucket(id : String) : Observable<any>{    //--imagem pequena
    let url = `${API_CONFIG.BucketBaseUrl}/prod${id}.jpg`
    return this.http.get(url,{responseType : 'blob'});
  }
  
}