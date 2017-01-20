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

    volumeTotal(){
        return this._listaNegociacao.reduce((total, n) => total + n.volume, 0);
    }

    ordena(criterio){
        this._listaNegociacao.sort( (a, b) => a[criterio] - b[criterio] );
    }

    inverte(){
        this._listaNegociacao.reverse();
    }



}