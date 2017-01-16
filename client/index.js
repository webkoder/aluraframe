var campos = [
    document.querySelector("#data"),
    document.querySelector("#quantidade"),
    document.querySelector("#valor")    
];

var tbody = document.querySelector("tbody");

document.querySelector('.form').addEventListener("submit", function(event){
    event.preventDefault();
    
    var ntr = document.createElement('tr');
    
    campos.forEach(function(campo){
        var ntd = document.createElement('td');
        ntd.textContent = campo.value;
        ntr.appendChild(ntd);
    });
    
    var volumetd = document.createElement('td');
    volumetd.textContent = campos[1].value * campos[2].value;
    ntr.appendChild(volumetd);
    
    tbody.appendChild(ntr);
    
    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0.0;
    
    campos[0].focus();
    
    
});