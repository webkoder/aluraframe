class ListaNegociacao{

    constructor(){
        this._listaNegociacao = [];
    }

    adiciona(negociacao){
        this._listaNegociacao.push(negociacao);
    }

    esvaziar(){
        this._listaNegociacao = [];
    }

    get listaNegociacao(){
        return [].concat(this._listaNegociacao);
    }

}