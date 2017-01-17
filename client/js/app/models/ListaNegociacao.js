class ListaNegociacao{

    constructor(armadilha){
        this._listaNegociacao = [];
        this._armadilha = armadilha;
    }

    adiciona(negociacao){
        this._listaNegociacao.push(negociacao);
        this._armadilha(this);
    }

    esvaziar(){
        this._listaNegociacao = [];
        this._armadilha(this);
    }

    get listaNegociacao(){
        return [].concat(this._listaNegociacao);
    }

}