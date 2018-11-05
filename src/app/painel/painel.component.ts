import { Component, OnInit } from '@angular/core';
import {Frase} from "../shared/frase.model";
import {FRASES} from "./frases-mock";

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  
  public frases: Frase[] = FRASES;
  public instrucao:string = "Traduza a frase:"
  public resposta:string;

  public progresso: number = 0;

  public rodada:number = 0;
  public rodadaFrase: Frase

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {
  }

  public atualizaReposta(resposta:Event):void {
    this.resposta = ((<HTMLInputElement>resposta.target).value);
    //console.log(this.resposta);
  }

  public verificarResposta():void{
    if(this.resposta === this.rodadaFrase.frasePtBr){
      this.rodada++;
      this.progresso+= (100/this.frases.length);
      this.atualizaRodada();
    }else {
      alert("Frase incorreta");
    }
  }

  public atualizaRodada(){
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = "";
  }

}
