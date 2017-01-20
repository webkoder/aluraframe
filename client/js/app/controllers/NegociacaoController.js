class NegociacaoController{
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        
        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
        this._ordemAtual = '';
        
        this._lista = new Bind(new ListaNegociacao(), new NegociacaoView($('#negociacaoView')), 'adiciona', 'esvaziar', 'ordena', 'inverte');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

    }
    
    adicionar(event){
        event.preventDefault();

        try{
        this._lista.adiciona(this._criaNegociacao());
        }catch(erro){
            this._mensagem.texto = 'A data é inválida';
            return;
        }
        this._limpaFormulario();
        
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        
        console.log(this._lista);
    }

    apagar(){
        this._lista.esvaziar();
        this._mensagem.texto = 'Lista de negociação removida';
    }

    ordena(coluna){
        if(this._ordemAtual == coluna){
            this._lista.inverte();
        }else{
            this._lista.ordena(coluna);
        }
        this._ordemAtual = coluna;
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