const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.btn'));
let currentInput = '';
let operator = '';
let previousValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (button.classList.contains('number')) {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateDisplay();
        } else if (button.classList.contains('operator')) {
            if (currentInput === '' && value !== '-') return; // Allow negative numbers
            if (currentInput === '') return;
            if (previousValue !== '') {
                currentInput = eval(`${previousValue} ${operator} ${currentInput}`).toString();
            }
            previousValue = currentInput;
            operator = value;
            currentInput = '';
        } else if (button.classList.contains('equal')) {
            if (operator === '' || currentInput === '' || previousValue === '') return;
            currentInput = eval(`${previousValue} ${operator} ${currentInput}`).toString();
            operator = '';
            previousValue = '';
            updateDisplay();
        } else if (button.classList.contains('clear')) {
            currentInput = '';
            previousValue = '';
            operator = '';
            updateDisplay();
        }
    });
});

function updateDisplay() {
    display.textContent = currentInput || '0';
}
