class DateHelper{

    constructor(){
        throw new Error('Não é permitido instanciar esta classe');
    }


    static textoParaData(texto){

        if(!/\d{4}-\d{2}-\d{2}/.test(texto)){
            throw new Error('O formato da data é inválida');
        }

        texto = texto.split('-');
        texto[1]--;
        return new Date(...texto);
    }

    static dataParaTexto(data){
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
}