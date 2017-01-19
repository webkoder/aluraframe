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

    static obterNegociacoes(){
        let service = new NegociacaoService();
        return Promise.all(
            [
                service.obterNegociacoesDaSemana(),
                service.obterNegociacoesDaSemanaAnterior(),
                service.obterNegociacoesDaSemanaRetrasada()
            ]
        )
        .then(lista => { return lista.reduce( (novo, item) => novo.concat(item), [] ) })
        .catch(erro =>  { return erro });
    }

}