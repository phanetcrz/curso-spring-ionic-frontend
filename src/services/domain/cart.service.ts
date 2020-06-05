import { StorageService } from "../storage.service";
import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDto } from "../../models/produto.dto";

@Injectable()    //-- para que CategoriaService seja um seriço que possa ver injetado em outras classes usa-se essa variavel
export class CartService{
    
    constructor(public storage: StorageService){
    }
    // Criar ou limpar o carrinho 
    createOrClearCart() : Cart {
        let cart: Cart = {items:[]};  //-- criou um carrinho vazio 
        this.storage.setCart(cart);   //-- e armazenou no localStorage 
        return cart;
    }

    getCart() : Cart{
        let cart: Cart = this.storage.getCart();
        if (cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto : ProdutoDto) : Cart{  //-- metodo para adicionar um produto no carrinho e retornar um cart Atualizado
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); //-- quero encontrar um elemento x tal que(=>) o x.produto.id seja igual"==" ao id do produto que veio como argumento (produto : ProdutoDto).      
        //-- tenho que encontrar na lista de itens(cart.itens) o produto que está vindo do parametro com isso terá que percorrer essa lista

        if (position == -1){
            cart.items.push({quantidade: 1, produto: produto});   //--push é o método que insere o elemento na lista que será o novo item no carrinho
        }
        this.storage.setCart(cart);
        return cart;
    }
}