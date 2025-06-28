// Interest type selection
document.querySelectorAll('.interest-option').forEach(option => {
    option.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        
        // Remove active class from all options
        document.querySelectorAll('.interest-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add active class to clicked option
        this.classList.add('selected');
        
        // Show appropriate calculator after a short delay
        setTimeout(() => {
            showCalculator(type);
        }, 300);
    });
});

function showCalculator(type) {
    // Hide selection card
    document.getElementById('selectionCard').style.display = 'none';
    
    // Hide all calculators
    document.querySelectorAll('.calculator-section').forEach(calc => {
        calc.classList.remove('show');
    });
    
    // Show selected calculator
    if (type === 'simple') {
        document.getElementById('simpleCalculator').classList.add('show');
    } else if (type === 'compound') {
        document.getElementById('compoundCalculator').classList.add('show');
    }
}

function resetCalculator() {
    // Hide all calculators
    document.querySelectorAll('.calculator-section').forEach(calc => {
        calc.classList.remove('show');
    });
    
    // Show selection card
    document.getElementById('selectionCard').style.display = 'block';
    
    // Remove selection from options
    document.querySelectorAll('.interest-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Clear all forms and results
    document.querySelectorAll('form').forEach(form => form.reset());
    document.querySelectorAll('.result').forEach(result => {
        result.style.display = 'none';
        result.classList.remove('show');
    });
}

// Simple Interest Calculator
document.getElementById('simpleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const principal = parseFloat(document.getElementById('simplePrincipal').value);
    const rate = parseFloat(document.getElementById('simpleRate').value);
    const time = parseFloat(document.getElementById('simpleTime').value);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate < 0 || time <= 0) {
        alert('Please enter valid positive numbers for all fields.');
        return;
    }
    
    const simpleInterest = (principal * rate * time) / 100;
    const totalAmount = principal + simpleInterest;
    
    document.getElementById('simplePrincipalResult').textContent = `₹${principal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('simpleRateResult').textContent = `${rate}%`;
    document.getElementById('simpleTimeResult').textContent = `${time} years`;
    document.getElementById('simpleInterestResult').textContent = `₹${simpleInterest.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('simpleTotalResult').textContent = `₹${totalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    
    const resultDiv = document.getElementById('simpleResult');
    resultDiv.style.display = 'block';
    resultDiv.classList.add('show');
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Compound Interest Calculator
document.getElementById('compoundForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const principal = parseFloat(document.getElementById('compoundPrincipal').value);
    const rate = parseFloat(document.getElementById('compoundRate').value) / 100;
    const time = parseFloat(document.getElementById('compoundTime').value);
    const frequency = parseInt(document.getElementById('compoundFrequency').value);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(time) || isNaN(frequency) || principal <= 0 || rate < 0 || time <= 0) {
        alert('Please enter valid positive numbers for all fields.');
        return;
    }
    
    const totalAmount = principal * Math.pow((1 + rate / frequency), frequency * time);
    const compoundInterest = totalAmount - principal;
    const effectiveRate = (Math.pow((1 + rate / frequency), frequency) - 1) * 100;
    
    // Get frequency text
    const frequencyTexts = {
        1: 'Annually',
        2: 'Semi-annually', 
        4: 'Quarterly',
        12: 'Monthly',
        52: 'Weekly',
        365: 'Daily'
    };
    
    document.getElementById('compoundPrincipalResult').textContent = `₹${principal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('compoundRateResult').textContent = `${(rate * 100).toFixed(2)}%`;
    document.getElementById('compoundTimeResult').textContent = `${time} years`;
    document.getElementById('compoundFrequencyResult').textContent = frequencyTexts[frequency];
    document.getElementById('compoundInterestResult').textContent = `₹${compoundInterest.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('effectiveRateResult').textContent = `${effectiveRate.toFixed(2)}%`;
    document.getElementById('compoundTotalResult').textContent = `₹${totalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    
    const resultDiv = document.getElementById('compoundResult');
    resultDiv.style.display = 'block';
    resultDiv.classList.add('show');
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Add input validation
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
});

// Add enter key support for forms
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const form = this.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
});

// Add keyboard navigation for selection
document.addEventListener('keydown', function(e) {
    if (document.getElementById('selectionCard').style.display !== 'none') {
        if (e.key === '1') {
            document.querySelector('[data-type="simple"]').click();
        } else if (e.key === '2') {
            document.querySelector('[data-type="compound"]').click();
        }
    }
});