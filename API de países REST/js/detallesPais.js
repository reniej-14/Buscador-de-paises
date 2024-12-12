
document.addEventListener('DOMContentLoaded', () => {
    const pais = localStorage.getItem('pais');

    // Llamada a la API para obtener datos del pais
    obtenerDatos(pais);
})

async function obtenerDatos(pais) {
    let url = `https://restcountries.com/v3.1/name/${pais}`;

    try {
        const resultado = await fetch(url);
        const datosPais = await resultado.json();
        imprimirDatos(datosPais[0])
    } catch (error) {
        console.log(error)
    }
}

async function imprimirDatos(pais) {
    const contenedor = document.querySelector('#contenido');
    const {name, population, region, capital, subregion, flags, tld, currencies, languages } = pais;

    console.log(pais)
    // Obtener la moneda de forma dinamica
    const monedas = Object.keys(pais.currencies).map(codigo => {
        const { name, symbol } = pais.currencies[codigo];
        return name;
    });

    // Obtener el idioma de forma dinamica
    const idioma = Object.values(pais.languages).join(', ');

    // Obtener las fronteras
    let border1 = 'Unknown';
    let border2 = 'Unknown';
    let border3 = 'Unknown';
    try {
        border1 = await obtenerFronteras(pais.borders[0]);
        border2 = await obtenerFronteras(pais.borders[1]);
        border3 = await obtenerFronteras(pais.borders[2]);
    } catch (error) {
        console.log(error)
    }
    

    // Crear HTML
    const regresar = document.createElement('section');
    regresar.classList.add('regresar');
    regresar.innerHTML = `
        <a href="index.html" class="regresar__btn">Back</a>
    `;

    const detallesPais = document.createElement('main');
    detallesPais.classList.add('pais');
    detallesPais.innerHTML = `
        <div class="pais__flex">
            <div class="pais__imagen">
                <img class="pais__img" src="${flags.png}" alt="${flags.alt}">
            </div>
    
            <div class="pais__info">
                <h3 class="pais__titulo">${name.common}</h3>
    
                <div class="pais__detalles">
                    <div class="detalles__1">
                        <p class="detalles__texto"><span class="detalles__span">Native Name: </span>${name.official}</p>
    
                        <p class="detalles__texto"><span class="detalles__span">Population: </span>${population}</p>
    
                        <p class="detalles__texto"><span class="detalles__span">Region: </span>${region}</p>
    
                        <p class="detalles__texto"><span class="detalles__span">Sub Region: </span>${subregion}</p>
    
                        <p class="detalles__texto"><span class="detalles__span">Capital: </span>${capital}</p>
                    </div>
    
                    <div class="detalles__2">
                        <p class="detalles__texto"><span class="detalles__span">Top Level Domain: </span>${tld}</p>
    
                        <p class="detalles__texto"><span class="detalles__span">Currencies: </span>${monedas}</p>
    
                        <p class="detalles__texto"><span class="detalles__span">Languages: </span>${idioma}</p>
                    </div>
                </div>

                <div class="border__contenedor">
                    <p class="border">Border Contries: </p>

                    <div>
                        <p class="border__texto">${border1}</p>
                        <p class="border__texto">${border2}</p>
                        <p class="border__texto">${border3}</p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    `;

    // Obtener frontera
    async function obtenerFronteras(frontera) {
        // Llamar a la API para obtener el nombre completo
        const url = `https://restcountries.com/v3.1/alpha/${frontera}`;

        try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            const nombreFrontera = resultado[0].name.common;

            return nombreFrontera;
        } catch (error) {
            console.log(error)
        }
    }

    // Imprimir el html
    contenedor.appendChild(regresar);
    contenedor.appendChild(detallesPais);
}