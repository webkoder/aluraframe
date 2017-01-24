class DateHelper{

    constructor(){
        throw new Error('Não é permitido instanciar esta classe');
    }


    static textoParaData(texto){

        let isInputText = false;
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)){
            if(!/\d{2}\/\d{2}\/\d{4}/.test(texto)){
                throw new Error('O formato da data é inválida');
            }else{
                isInputText = true;
            }
            
        }

        if(isInputText){
            texto = texto.split('/');
            texto.reverse();
        }else
            texto = texto.split('-');
        texto[1]--;
        return new Date(...texto);
    }

    static dataParaTexto(data){
        // if(!data) return '';
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
}