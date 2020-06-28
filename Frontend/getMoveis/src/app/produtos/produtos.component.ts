import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  listaProdutos: Produto[]

  produto: Produto = new Produto

  usuario: string = localStorage.getItem('usuario')

  nome: string = localStorage.getItem('nome')

  totalcarrinho: number = parseFloat(localStorage.getItem('totalcarrinho'))

  constructor(private produtoService: ProdutoService, public router: Router, public authService: AuthService) { }

  ngOnInit(): void {

    this.pesquisarPorNome();

    localStorage.setItem('nome', "a");
  }

  // findallProdutos() {
  //   this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
  //     this.listaProdutos = resp
  //   })
  // }

  pesquisarPorNome() {
    this.produtoService.GetByNome(this.nome).subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  buscaCadeiras() {
    localStorage.setItem('nome', "cadeira");
    location.assign('/produtos');
  }

  buscaMesas() {
    localStorage.setItem('nome', "mesa");
    location.assign('/produtos');
  }

  buscaPoltronas() {
    localStorage.setItem('nome', "poltrona");
    location.assign('/produtos');
  }

  buscaSofas() {
    localStorage.setItem('nome', "sofa");
    location.assign('/produtos');
  }

  findByCodigoDoProduto(codigoDoProduto: number) {
    this.produtoService.GetById(codigoDoProduto).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  AdicionarAoCarrinho(produto: Produto) {
    produto.carrinho = localStorage.getItem('usuario')
    this.produtoService.putProduto(produto).subscribe((resp: Produto) => {
      this.produto = resp

    })
    alert("Produto adicionado ao carrinho")
    this.totalcarrinho = this.totalcarrinho + produto.valor
    var totalcarrinhoString = (this.totalcarrinho).toString();
    localStorage.setItem('totalcarrinho', totalcarrinhoString)
    alert(`valor total: ${totalcarrinhoString}`)
  }

}

