function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function calculate() {
    const totalValue = parseFloat(document.getElementById('valorTotal').value) || 0;
    const numInstallments = parseInt(document.getElementById('qtdMensalidades').value) || 0;
    const installmentValue = parseFloat(document.getElementById('valorMensalidades').value) || 0;
    const interestRate = parseFloat(document.getElementById('taxaRendimento').value) || 0;

    const monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12);
    let outstandingBalance = totalValue;
    let amountPaid = 0;

    for(let i = 0; i < numInstallments; i++) {
        outstandingBalance -= installmentValue;
        outstandingBalance *= 1 + monthlyRate/100;
        amountPaid += installmentValue;
        console.log(i, amountPaid, outstandingBalance);
    }

    const finalDiscount = outstandingBalance;
    const finalValue = totalValue-finalDiscount;

    document.getElementById('valorFinal').textContent = formatCurrency(finalValue);
    document.getElementById('descontoFinal').textContent = formatCurrency(finalDiscount);

    document.getElementById('descontoFinalPorcentagem').textContent = `${((finalDiscount/totalValue)*100).toFixed(2)}%`;
    
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculate();
        }
    });
});