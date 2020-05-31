// Listen for submit
const submit = document.getElementById('loan-form');
submit.addEventListener('submit', function (e) {
    //hide results
    document.getElementById('results').style.display = 'none';

    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResult, 2000);

    e.preventDefault();

});

// Calculate Results
function calculateResult() {
    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;
    // Compute montly payment
    const x = (calculatedInterest * (Math.pow((1 + calculatedInterest), calculatedPayments))) / ((Math.pow((1 + calculatedInterest), calculatedPayments)) - 1);

    const monthly = (principal * x);


    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block';

        //hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Пожалуйста проверьте правильность введенных Вами данных');
    }

}

function showError(error) {

    //hide results
    document.getElementById('results').style.display = 'none';

    //hide loader
    document.getElementById('loading').style.display = 'none';


    const errorDiv = document.createElement('div');

    // get elem
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //add class
    errorDiv.className = 'alert alert-danger';

    // create text node & append to div
    errorDiv.append(document.createTextNode(error));

    // insert error above heading
    card.prepend(errorDiv);

    // clear error after 3 sec
    setTimeout(clearError, 3000);
}

// clear error
function clearError() {
    document.querySelector('.alert').remove();
}