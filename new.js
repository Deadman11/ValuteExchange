const columnValute = document.querySelector('.all-valute__wrap');
const conversList = document.querySelector('.valute-id')
const activeValute = document.querySelector('.convers-valute')
const inputValue = document.querySelector('.convers-input')
const chagesValute = document.querySelector('.convers-valute__value')

let actualPrice = 0
     
let valuteName = [];
let valuteRates = [];


const apiKey = 'dff258dea5960ea4bb00bc0d';
function loadExchangeRate(baseCurrencty) {
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrencty}`)
        .then(response => response.json())
        .then(data => {
            for(let i in Object.keys(data.conversion_rates)){
                valuteName.push(Object.keys(data.conversion_rates)[i])
            }
            for(let i in Object.keys(data.conversion_rates)){
                valuteRates.push(Object.values(data.conversion_rates)[i].toFixed(2))
            }
            renderRates()
            addConversValute()
            changeConversValute(baseCurrencty)
            findActualPrice(data)
        })
        .catch(error => {
            console.error(error);
        });
}


function renderRates() {
    const valuteNameWrapper = document.createElement('div');
    const valuteCoursesWrapper = document.createElement('div');

    valuteNameWrapper.classList = 'valute-char-code__wrapper currency-exchange-rates'
    valuteCoursesWrapper.classList = 'valute-courses__wrapper currency-exchange-rates'

    columnValute.appendChild(valuteNameWrapper);
    columnValute.appendChild(valuteCoursesWrapper);

    for(let i = 0;i < valuteName.length ;i++ ){
        const addValuteName = document.createElement('div');
        addValuteName.classList = 'all-valute__char-code';
        addValuteName.textContent = valuteName[i]
        valuteNameWrapper.appendChild(addValuteName)
    }

    for(let i = 0;i < valuteRates.length ;i++ ){
        const addValuteName = document.createElement('div');
        addValuteName.classList = 'all-valute__courses';
        addValuteName.textContent = valuteRates[i]
        valuteCoursesWrapper.appendChild(addValuteName)
    }
    
}

function changeValute() {
    columnValute.addEventListener('click', (event) => {
        if(event.target.classList.contains('all-valute__char-code')) {
            clearAll()
            const currencyCode = event.target.textContent;
            loadExchangeRate(currencyCode)
            addConversValute()
        }
    })
}

function addConversValute() {
    for(let i = 0;i < valuteName.length ;i++ ){
        const addOptionToConversList = document.createElement('option');
        addOptionToConversList.setAttribute("valute", valuteName[i])
        addOptionToConversList.textContent = valuteName[i]
        conversList.appendChild(addOptionToConversList)   
    }
}

function changeConversValute(baseCurrencty) {
    activeValute.textContent = baseCurrencty
}


function findActualPrice(data) {
    const changesData = data.conversion_rates
    conversList.addEventListener('change', (event) => {
        const actualValute = event.target.value
        for(let i in changesData){
            if(actualValute === i) {
                actualPrice = changesData[i]
            }
        }
    })
}

function clearAll() {
    columnValute.innerHTML = ''
    valuteName = [];
    valuteRates = [];
    chagesValute.textContent = 0
    inputValue.value = ''
    conversList.value = ''
    actualPrice = 0
}

inputValue.addEventListener('input', function(e) {
    let value = this.value.replace(/[^\d]/g, '');

    if(value !== '' && value !== '-') {
        const number = parseInt(value.replace(/\D/g, ''));
        const formatted = new Intl.NumberFormat('ru-RU').format(Math.abs(number));
        this.value = value.startsWith('-') ? '-' + formatted : formatted
    }

    let conversMoneyNow = (value * actualPrice).toFixed(2)
    const formattedConversMoney = new Intl.NumberFormat('ru-RU').format(conversMoneyNow)
    chagesValute.textContent = formattedConversMoney
})

conversList.addEventListener('change', () => {
    chagesValute.textContent = 0
    inputValue.value = ''
})


document.addEventListener('DOMContentLoaded', () => {
    loadExchangeRate('USD')
    changeValute()
})