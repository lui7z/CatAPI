document.querySelector("button").addEventListener("click", function () {
    const fatos = document.getElementById('fatos');

    fatos.innerHTML = '<br><div class="spinner-grow" role="status"><span class="sr-only">Carregando...</span></div>';

    fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => {
            fatos.innerHTML = `<p>${data.facts[0]}</p>`;
        })
        .catch(error => {
            fatos.innerHTML = '<p>Erro ao buscar fato.</p>';
            console.error('Erro:', error);
        });
});
