class NegociacaoController{
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        
        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
        this._ordemAtual = '';
        
        this._lista = new Bind(new ListaNegociacao(), new NegociacaoView($('#negociacaoView')), 'adiciona', 'esvaziar', 'ordena', 'inverte');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._init();
    }

    _init(){
        
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(lista => lista.forEach(n => this._lista.adiciona(n) ))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });

            // setInterval(() => {
            //     console.log('importando a negociacao');
            //     this.importarNegociacoes();
            // }, 3000);

    }
    
    adicionar(event){
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        new NegociacaoService()
            .cadastrar(negociacao)
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._lista.adiciona(negociacao);
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
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
            // .then(lista => lista.filter(negociacao => !this._lista.ListaNegociacao.some(negociacaoExistente => JSON.stringify(negociacao) == JSON.stringfy(negociacaoExistente) ) ) )
            .then(lista => lista.filter(negociacao => {
                return !this._lista.listaNegociacao.some(negociacaoExistente => JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)) ;
            } ) )
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