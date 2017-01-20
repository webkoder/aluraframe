class NegociacaoView extends View{
    
    template(lista){

        return `<table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="nc.ordena('data')">DATA</th>
                    <th onclick="nc.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="nc.ordena('valor')">VALOR</th>
                    <th onclick="nc.ordena('volume')">VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
            ${lista.listaNegociacao.map(n => `<tr><td>${DateHelper.dataParaTexto(n.data)}</td><td>${n.quantidade}</td><td>${n.valor}</td><td>${n.volume}</td></tr>`).join('')}
            </tbody>
            
            <tfoot>
                <tr>
                    <td colspan='3'></td>
                    <td>${lista.volumeTotal()}</td>
                </tr>
            </tfoot>
        </table>`;
    }
}