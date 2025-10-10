const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = cityInput.value;
    weatherResult.innerHTML = '';
    errorMessage.textContent = '';

    if (!city){
        errorMessage.textContent = 'Por favor, digite o nome de uma cidade.';
        return;
    }

    try {
        const response = await fetch (`/clima?cidade=${encodeURIComponent(city)}`);
        const data = await response.json()

        if (response.status !== 200){
            errorMessage.textContent = data.error;
        } else {
            displayWeather(data);
        }
    } catch (error){
        errorMessage.textContent = 'Não foi possivel conectar ao servidor. Tente novamente mais tarde ';
    }
});

function displayWeather(data) {
    const { nome, pais, temperatura, sensacaoTermica, umidade, condicao, icone } = data;

    const weatherContent = `
        <div class="weather-info">
            <h2>${nome}, ${pais} <img src="${icone}" alt="Ícone do tempo"></h2>
            <p><strong>Temperatura:</strong> ${temperatura.toFixed(1)}°C</p>
            <p><strong>Sensação Térmica:</strong> ${sensacaoTermica.toFixed(1)}°C</p>
            <p><strong>Umidade:</strong> ${umidade}%</p>
            <p><strong>Condição:</strong> ${condicao}</p>
        </div>
    `;
    weatherResult.innerHTML = weatherContent;
}