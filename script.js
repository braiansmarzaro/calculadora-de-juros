function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function calculate() {
    const cashValue = parseFloat(document.getElementById('valorTotal').value) || 0;
    const numInstallments = parseInt(document.getElementById('qtdMensalidades').value) || 0;
    const installmentValue = parseFloat(document.getElementById('valorMensalidades').value) || 0;
    const interestRate = parseFloat(document.getElementById('taxaRendimento').value) || 0;

    const monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12);
    console.log(monthlyRate);
    let outstandingBalance = cashValue;
    let amountPaid = 0;

    for(let i = 0; i < numInstallments; i++) {
        // Calcula juros sobre o saldo devedor
        outstandingBalance = outstandingBalance * (1+monthlyRate/100);
        outstandingBalance -= installmentValue;
        amountPaid += installmentValue;
        console.log(i, amountPaid, outstandingBalance);
    }

    const effectiveCost = installmentValue*numInstallments - Math.abs(outstandingBalance);
    
    // Atualiza os resultados
    document.getElementById('valorVista').textContent = formatCurrency(cashValue);
    document.getElementById('valorParcelado').textContent = formatCurrency(effectiveCost);
    
    const diferenca = Math.abs(cashValue - effectiveCost);
    document.getElementById('diferenca').textContent = formatCurrency(diferenca);

    // Determina a melhor opção
    const melhorOpcao = document.getElementById('melhorOpcao');
    if (effectiveCost < cashValue) {
        melhorOpcao.textContent = "PARCELADO";
        melhorOpcao.style.color = "#047857"; // verde
    } else if (effectiveCost > cashValue) {
        melhorOpcao.textContent = "À VISTA";
        melhorOpcao.style.color = "#047857"; // verde
    } else {
        melhorOpcao.textContent = "EQUIVALENTES";
        melhorOpcao.style.color = "#4a5568"; // cinza
    }
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculate();
        }
    });
});