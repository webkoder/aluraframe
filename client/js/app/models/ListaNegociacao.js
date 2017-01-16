class ListaNegociacao{

    constructor(){
        this._listaNegociacao = [];
    }

    adiciona(negociacao){
        this._listaNegociacao.push(negociacao);
    }

    get listaNegociacao(){
        return [].concat(this._listaNegociacao);
    }

}