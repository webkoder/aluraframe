class NegociacaoController{
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        
        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
        this._ordemAtual = '';
        
        this._lista = new Bind(new ListaNegociacao(), new NegociacaoView($('#negociacaoView')), 'adiciona', 'esvaziar', 'ordena', 'inverte');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(lista => lista.forEach(n => this._lista.adiciona(n) ))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });

    }
    
    adicionar(event){
        event.preventDefault();

        ConnectionFactory.getConnection()
        .then(connection => {
            let negociacao = this._criaNegociacao();

            new NegociacaoDao(connection)
                .adiciona(negociacao)
                .then(() => {
                    this._lista.adiciona(negociacao);
                    this._mensagem.texto = 'Negociação adicionada com sucesso';
                    this._limpaFormulario();
                })
                .catch(erro => this._mensagem.texto = 'A data é inválida');
            });
    }

    apagar(){

        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(msg => {
                this._lista.esvaziar();
                this._mensagem.texto = msg;
            })
            .catch(msg => this._mensagem.texto = msg);

        
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
            parseInt(this.inputQuantidade.value),
            parseFloat(this.inputValor.value)
        );
    }

    _limpaFormulario(){
        this.inputData.value = '';
        this.inputQuantidade.value = 1;
        this.inputValor.value = 0.0;

        this.inputData.focus();
    }
}