import { Component, OnInit } from '@angular/core'; //Typescript cadastro
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro-eusuarios',
  templateUrl: './cadastro-eusuarios.component.html',
  styleUrls: ['./cadastro-eusuarios.component.css']
})
export class CadastroEUsuariosComponent implements OnInit {

  seta: string = "assets/img/Cadastro/Seta.png"

  cadastrook: boolean = false;

  cadastroerro: boolean = false;

  usuario: Usuario = new Usuario
  senha: string;

  constructor(private authService: AuthService, private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    window.scroll(0, 0)
    localStorage.setItem('pagprodutos', "nao");
  }

  conferirSenha(event: any) {
    this.senha = event.target.value;
  }

  cadastrar() {
    if (this.senha === this.usuario.senha) {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.cadastrook = true;
      }, err => {
        this.cadastroerro = true;
      });
    } else {
      this.cadastroerro = true;
    }

  }

  ReloadCadastro() {
    location.reload();
  }

  ErroCadastro() {
    this.cadastroerro = false;
  }





}


