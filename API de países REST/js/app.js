const buscar = document.querySelector('#buscar');
const filtrar = document.querySelector('#filtrar');
const resultado = document.querySelector('#resultado');
let paisDetalles;

// Obtener pais buscado
buscar.addEventListener('input', buscarPais);

async function buscarPais(e) {
    let pais = e.target.value;
    url = `https://restcountries.com/v3.1/name/${pais}`;

    try {
        const resultado = await fetch(url);
        const resultadoPais = await resultado.json();
        limpiarHTML();
        imprimirPais(resultadoPais[0]);
    } catch (error) {
        console.log(error)
    }
}

function imprimirPais(pais) {
    console.log(pais);
    const { name, population, region, capital, subregion, flags } = pais;

    // Crear div del card
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.onclick = function() {
        paisDetalles = name.common;

        // Guardar pais seleccionado en localStorage
        localStorage.setItem('pais', paisDetalles);

        // Abrir destalles del pais
        window.location.href = 'detalles-pais.html';
    }

    divCard.innerHTML = `
        <div class="card__imagen">
            <img class="card__img" src="${flags.png}" alt="${flags.alt}">
        </div>
            
        <div class="card__info">
            <h3 class="card__titulo">${name.common}</h3>
            <p class="card__texto"><span class="card__span">Poulation: </span>${population}</p>
             <p class="card__texto"><span class="card__span">Region: </span>${region}</p>
             <p class="card__texto"><span class="card__span">Capital: </span>${capital}</p>
        </div>
    `
    resultado.appendChild(divCard)
}

/* Obtener paises por filtro de region */
filtrar.addEventListener('change', filtrarRegion);

async function filtrarRegion(e) {
    const region = e.target.value;
    const url = `https://restcountries.com/v3.1/region/${region}`;

    try {
        const resultado = await fetch(url);
        const resultadoPaises = await resultado.json();
        limpiarHTML();
        imprimirPaises(resultadoPaises);
        buscar.value = '';
    } catch (error) {
        console.log(error)
    }
}

function imprimirPaises(paises) {

    paises.forEach(pais => {
        
        // Crear div del card
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.onclick = function() {
            paisDetalles = pais.name.common;

            // Guardar pais seleccionado en localStorage
            localStorage.setItem('pais', paisDetalles);

            // Abrir destalles del pais
            window.location.href = 'detalles-pais.html';
        }
        divCard.innerHTML = `
            <div class="card__imagen">
                <img class="card__img" src="${pais.flags.png}" alt="${pais.flags.alt}">
            </div>
                
            <div class="card__info">
                <h3 class="card__titulo">${pais.name.common}</h3>
                <p class="card__texto"><span class="card__span">Population: </span>${pais.population}</p>
                <p class="card__texto"><span class="card__span">Region: </span>${pais.region}</p>
                <p class="card__texto"><span class="card__span">Capital: </span>${pais.capital}</p>
            </div>
        `
        resultado.appendChild(divCard);
    });
}

// Limpiar html
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

/* json-server --watch db.json --port 4000 */