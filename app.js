// listen for event on submit 
document.getElementById('loan-form').addEventListener('submit', function(e){

    //show loader
    document.getElementById('loading').style.display = 'block'

    setTimeout(calculateResults, 2000)

    e.preventDefault();
});


// Calculate Results
function calculateResults(e) {
    console.log('calculating....')

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    
    const princial = parseFloat(amount.value);
    const calculateInterest = parseFloat(interest.value) / 100 / 12;
    const calculatePayments =  parseFloat(years.value) * 12;

    // Calculate monthly payment
    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (princial * x * calculateInterest) / (x-1);

    if(isFinite(monthly)) { /*determine wheter a number is finite*/
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayments).toFixed(2);
        totalInterest.value = ((monthly * calculatePayments) - princial).toFixed(2);

        //Show results
        document.getElementById('results').style.display = 'block'

        //Hide loader 
        document.getElementById('loading').style.display = 'none'

    } else {
        showError('Please check your numbers');
        
    }
    
}

function showError(error) {

    //Hide results
    document.getElementById('results').style.display = 'none'

    //Hide loader 
    document.getElementById('loading').style.display = 'none'
    
   //create a div
   const errorDiv = document.createElement('div');

   //Select where to put the div
   const card = document.querySelector('.card')
   const heading = document.querySelector('.heading')

   //Create the errorDiv class
   errorDiv.className = ('alert alert-danger')

   //append the text to the div
  errorDiv.appendChild(document.createTextNode(error));

   //Insert the text to the div
   card.insertBefore(errorDiv, heading)

   //call the time out function
   
 setTimeout(ClearError, 3000)
}
 
function ClearError() {
    document.querySelector('.alert').remove()
}
