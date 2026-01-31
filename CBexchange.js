fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(response => {
        if (!response.ok) {
            throw new Error(`http error! code: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let nameValue = data.Valute
        const columnValute = document.querySelector('.all-valute__wrap');
        const valuteCharCode = [];
        const valuteCourses = [];
        const valuteName = [];


        for (const val in nameValue) {
            valuteCharCode.push(nameValue[val].CharCode);
            valuteCourses.push(nameValue[val].Value)
            valuteName.push(nameValue[val].Name)
        }

        function showValuteCharCode() {
            const valuteWrapper = document.createElement('div')
            valuteWrapper.classList = 'valute-char-code__wrapper currency-exchange-rates'
            columnValute.appendChild(valuteWrapper)
            for (let i = 0; i < valuteCharCode.length; i++) {
                const addValute = document.createElement('div');
                addValute.classList = 'all-valute__char-code';
                addValute.textContent = valuteCharCode[i];
                valuteWrapper.appendChild(addValute)
            }
        }

        function showValuteCourses() {
            const valuteWrapper = document.createElement('div')
            valuteWrapper.classList = 'valute-courses__wrapper currency-exchange-rates'
            columnValute.appendChild(valuteWrapper)
            for (let i = 0; i < valuteCourses.length; i++) {
                const addValute = document.createElement('div');
                addValute.classList = 'all-valute__courses';
                addValute.textContent = Math.floor(valuteCourses[i] * 100) / 100;
                valuteWrapper.appendChild(addValute)
            }
        }

        showValuteCharCode()
        showValuteCourses()
        showValuteName()
    })









// https://www.cbr-xml-daily.ru/daily_json.js