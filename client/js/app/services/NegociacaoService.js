class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana(){

        return this._http.get('/negociacoes/semana')
            .then(dados => { return dados.map(d => new Negociacao(new Date(d.data), d.quantidade, d.valor)) })
            .catch(erro => { throw new Error('Erro ao importar lista de negociação da semana')} );
        
    }

    obterNegociacoesDaSemanaAnterior(){

        return this._http.get('/negociacoes/anterior')
            .then(dados => { return  dados.map(d => new Negociacao(new Date(d.data), d.quantidade, d.valor)) } )
            .catch(erro => { throw new Error('Erro ao importar lista de negociação da semana anterior')} );
        
    }

    obterNegociacoesDaSemanaRetrasada(){

        return this._http.get('/negociacoes/retrasada')
            .then(dados => { return  dados.map(d => new Negociacao(new Date(d.data), d.quantidade, d.valor)) } )
            .catch(erro => { throw new Error('Erro ao importar lista de negociação da semana retrasada')} );   
    }

    obterNegociacoes(){
        return Promise.all(
            [
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]
        )
        .then(lista => { return lista.reduce( (novo, item) => novo.concat(item), [] ) })
        .catch(erro =>  { return erro });
    }

    cadastrar(negociacao){
        return ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.adiciona(negociacao))
        .then( () => 'Negociação adicionada com sucesso')
        .catch( () => 'Erro ao gravar os dados' );
            
    }

    lista(){
        return ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.listaTodos())
        .catch(erro => {
            console.log(erro);
        });
    }

    apagaTodas(){
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(msg => 'Lista de negociação removida')
            .catch(msg => msg);
    }

    importa(listaAtual){
        return this.obterNegociacoes()
            .then(lista => lista.filter(negociacao => {
                return !listaAtual.some(negociacaoExistente =>
                    negociacao.equals(negociacaoExistente)) ;
            } ) )
            .catch(erro => erro);
    }

}