class NegociacaoDao{

    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){
        return new Promise((resolve, reject) => {

            let request = this._connection.transaction([this._store],
            'readwrite')
            .objectStore(this._store)
            .add(negociacao);

            // let transaction = this._connection.transaction([this._store], 'readwrite');

            // let objectStore = transaction.objectStore(this._store);
            
            // let request = objectStore.store.add(negociacao);

            console.log(request);

            request.onsuccess = e => {
                console.log("Adicionado com sucesso");
                console.log(negociacao);                
                resolve();
            };
            request.onerror = e => {
                console.log(e.target.error.name);
                reject('Não foi possível adicionar a negociação');
            };

        });
    }

    listaTodos(){
        return new Promise((resolve, reject) => {
            let cursor = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => { 
                let atual = e.target.result;

                if(atual){
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor)); 
                    atual.continue();
                }else{
                    resolve(negociacoes);
                    console.log(negociacoes);
                }
            };

            cursor.onerror = e => { 
                reject(`Não foi possível abrir a tabela ${this._store}`);
                console.log(e.target.error.name);
            };
        });
    }

    apagaTodos(){

        return new Promise((resolve, reject) => {
            let request = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

                request.onsuccess = e => resolve('Negociações removidas com sucesso');
                request.onerror = e => {
                    console.log(e.target.error);
                    reject('Não foi possível remover as negociações');
                }
        });
    }
}