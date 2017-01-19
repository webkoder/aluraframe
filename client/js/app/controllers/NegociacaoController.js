class NegociacaoController{
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        
        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
        
        this._lista = new Bind(new ListaNegociacao(), new NegociacaoView($('#negociacaoView')), 'adiciona', 'esvaziar');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

    }
    
    adicionar(event){
        event.preventDefault();

        this._lista.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        
        console.log(this._lista);
    }

    apagar(){
        this._lista.esvaziar();
        this._mensagem.texto = 'Lista de negociação removida';
    }

    importarNegociacoes(){
        let service = NegociacaoService.obterNegociacoes()
            .then(lista => lista.forEach( n => this._lista.adiciona(n)) )
            .catch(erro => this._mensagem.texto = erro);
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