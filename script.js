document.querySelector("button").addEventListener("click", function () {
    const fatos = document.getElementById('fatos');
    const racas = document.getElementById('racas');

    fatos.innerHTML = '<br><div class="spinner-grow" role="status"><span class="sr-only">Carregando...</span></div>';

    fetch('https://catfact.ninja/fact') 
        .then(response => response.json()) 
        .then(data => {
            let fatoOriginal = data.fact;

            fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(fatoOriginal)}&langpair=en|pt`)
                .then(response => response.json())
                .then(translateData => {
                    let fatoTraduzido = translateData.responseData.translatedText;
                    fatos.innerHTML = `<p>${fatoTraduzido}</p>`;
                })
                .catch(error => {
                    fatos.innerHTML = `<p>${fatoOriginal} (Tradução indisponível)</p>`;
                    console.error('Erro ao traduzir:', error);
                });
        })
        .catch(error => {
            fatos.innerHTML = '<p>Erro ao buscar fato.</p>';
            console.error('Erro:', error);
        });

    fetch('https://catfact.ninja/breeds')
        .then(response => response.json())
        .then(data => {
            racas.innerHTML = `<p>${data.data.map(breed => breed.breed).join(", ")}</p>`;
        })
        .catch(error => {
            racas.innerHTML = '<p>Erro ao buscar raças.</p>';
            console.error('Erro:', error);
        });
});