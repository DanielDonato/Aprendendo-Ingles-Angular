import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  public tentativas:number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  public rodada:number = 0;
  public rodadaFrase: Frase

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {
  }

  public atualizaReposta(resposta:Event):void {
    this.resposta = ((<HTMLInputElement>resposta.target).value);
  }

  public verificarResposta():void{
    if(this.resposta === this.rodadaFrase.frasePtBr){
      this.rodada++;
      this.progresso+= (100/this.frases.length);
      if(this.rodada === 4){
        this.encerrarJogo.emit('vitoria');
      }
      this.atualizaRodada();
    }else {
      this.tentativas--;
      if(this.tentativas === -1){
        this.encerrarJogo.emit('derrota');
      }
    }
  }

  public atualizaRodada(){
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = "";
  }
}
