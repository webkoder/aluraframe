class NegociacaoController{
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        
        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
    }
    
    adiciona(event){
        event.preventDefault();
        
        let data = this.inputData.value.split('-');
        data[1]--;
        
        let negociacao = new Negociacao(
            new Date(...data),
            this.inputQuantidade.value,
            this.inputValor.value
        );
        
        let ntr = document.createElement('tr');
        
        ntr.innerHTML = "<td>"+ negociacao.data + "</td>" + 
                "<td>"+ negociacao.quantidade + "</td>" + 
                "<td>"+ negociacao.valor + "</td>" + 
                "<td>"+ negociacao.volume + "</td>";
        
        document.querySelector("tbody").appendChild(ntr);
        
        
        console.log(this.inputData.value);
        console.log(this.inputQuantidade.value);
        console.log(this.inputValor.value);
        
    }
}