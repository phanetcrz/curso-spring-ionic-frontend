import { StorageService } from "../storage.service";
import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

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

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto : ProdutoDTO) : Cart {  //-- metodo para adicionar um produto no carrinho e retornar um cart Atualizado
        let cart = this.getCart();
       
        let position = cart.items.findIndex(x => x.produto.id == produto.id); //-- quero encontrar um elemento x tal que(=>) o x.produto.id seja igual"==" ao id do produto que veio como argumento (produto : ProdutoDTO).                            
        //-- tenho que encontrar na lista de itens(cart.itens) o produto que está vindo do parametro com isso terá que percorrer essa lista

        if (position == -1){
            cart.items.push({quantidade: 1, produto: produto});   //--push é o método que insere o elemento na lista que será o novo item no carrinho
        }
        this.storage.setCart(cart);       
        return cart;
    }

    removeProduto(produto : ProdutoDTO) : Cart {  //-- metodo para remover um produto no carrinho e retornar um cart Atualizado
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); //-- quero encontrar um elemento x tal que(=>) o x.produto.id seja igual"==" ao id do produto que veio como argumento (produto : ProdutoDTO).      
        //-- tenho que encontrar na lista de itens(cart.itens) o produto que está vindo do parametro com isso terá que percorrer essa lista

        if (position != -1){
            cart.items.splice(position, 1);  //-- splice é o metodo para remover um elemento da lista, passando a posição e 1 que significa uma deleção
        }
        this.storage.setCart(cart);
        return cart;
    }    

    increaseQuantity(produto : ProdutoDTO) : Cart {  //-- metodo para incrementar uma quantidade um produto no carrinho e retornar um cart Atualizado
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); //-- quero encontrar um elemento x tal que(=>) o x.produto.id seja igual"==" ao id do produto que veio como argumento (produto : ProdutoDTO).      
        //-- tenho que encontrar na lista de itens(cart.itens) o produto que está vindo do parametro com isso terá que percorrer essa lista

        if (position != -1){
            cart.items[position].quantidade++;  //-- para imcrementar mais um na quantida, basta pegar a posição na coleção e usar ++ na quantidade, pois pega o que está lá e soma com mais um
        }
        this.storage.setCart(cart);
        return cart;
    }        

    decreaseQuantity(produto : ProdutoDTO) : Cart {  //-- metodo para descrementar uma quantidade, retirando da quatidade atual de um produto no carrinho e retornar um cart Atualizado
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); //-- quero encontrar um elemento x tal que(=>) o x.produto.id seja igual"==" ao id do produto que veio como argumento (produto : ProdutoDTO).      
        //-- tenho que encontrar na lista de itens(cart.itens) o produto que está vindo do parametro com isso terá que percorrer essa lista

        if (position != -1){
            cart.items[position].quantidade--;  //-- para imcrementar mais um na quantida, basta pegar a posição na coleção e usar ++ na quantidade, pois pega o que está lá e soma com mais um
            
            if (cart.items[position].quantidade <1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }            

    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i=0; i<cart.items.length;i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }
}