document.querySelector("button").addEventListener("click", function () {
    const fatosEl = document.getElementById('fatos');

    fatosEl.innerHTML = '<br><div class="spinner-grow" role="status"><span class="sr-only">Carregando...</span></div>';

    fetch('https://catfact.ninja/fact') 
        .then(response => response.json()) 
        .then(data => {
            let fatoOriginal = data.fact;

            fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(fatoOriginal)}&langpair=en|pt`)
                .then(response => response.json())
                .then(data => {
                    let fatoTraduzido = data.responseData.translatedText;
                    fatosEl.innerHTML = `<p>${fatoTraduzido}</p>`;
                })
                .catch(error => {
                    fatosEl.innerHTML = `<p>${fatoOriginal} (Tradução indisponível)</p>`;
                    console.error('Erro ao traduzir:', error);
                });
        })
        .catch(error => {
            fatosEl.innerHTML = '<p>Erro ao buscar fato.</p>';
            console.error('Erro:', error);
        });
});