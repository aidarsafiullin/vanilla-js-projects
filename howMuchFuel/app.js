const calc = document.getElementById('calc');
const distance = document.getElementById('distance');
const consumption = document.getElementById('consumption');
const price = document.getElementById('price');
const wastedFuel = document.querySelector('.wastedFuel');
const wastedMoney = document.querySelector('.wastedMoney');

calc.addEventListener('submit', function(e) {
    const priceForHundred = consumption.value * price.value;
    const hundredTimes = distance.value / 100;
    const resultsMoney = priceForHundred * hundredTimes;
    const resultFuel = resultsMoney / price.value;

    wastedMoney.textContent = resultsMoney;
    wastedFuel.textContent = resultFuel
    e.preventDefault();
});



