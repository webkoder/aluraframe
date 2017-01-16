class NegociacaoController{
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        
        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
        this._lista = new ListaNegociacao();
        this._view = new NegociacaoView($('#negociacaoView'));

        this._view.update(this._lista);
    }
    
    adiciona(event){
        event.preventDefault();

        this._lista.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        this._view.update(this._lista);
        
        console.log(this._lista);
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this.inputData.value),
            this.inputQuantidade.value,
            this.inputValor.value
        );
    }

    _limpaFormulario(){
        this.inputData.value = '';
        this.inputQuantidade.value = 1;
        this.inputValor.value = 0.0;

        this.inputData.focus();
    }
}