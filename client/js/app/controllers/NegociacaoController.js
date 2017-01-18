class NegociacaoController{
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        
        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
        this._view = new NegociacaoView($('#negociacaoView'));
        let self = this;
        this._lista = new Proxy(new ListaNegociacao(), {
            get(target, prop, receiver){
                if(['adiciona', 'esvaziar'].includes(prop) && typeof(target[prop]) == 'function'){
                    return function(){
                        console.log('atualizando');
                        
                        Reflect.apply(target[prop], target, arguments);
                        self._view.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));

        this._view.update(this._lista);
    }
    
    adicionar(event){
        event.preventDefault();

        this._lista.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);
        
        console.log(this._lista);
    }

    apagar(){
        this._lista.esvaziar();
        this._mensagem.texto = 'Lista de negociação removida';
        this._mensagemView.update(this._mensagem);
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