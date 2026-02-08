// js/calculadora-financiamento.js - Calculadora de financiamiento
// Autor: INNOVA Soluções Imobiliárias
// Versión: 1.0

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de simulación
    if (!document.getElementById('calculator-result')) return;
    
    // ===== CALCULADORA DE FINANCIAMENTO =====
    const propertyValue = document.getElementById('property-value');
    const propertyValueDisplay = document.getElementById('property-value-display');
    const downPayment = document.getElementById('down-payment');
    const downPaymentDisplay = document.getElementById('down-payment-display');
    const income = document.getElementById('income');
    const incomeDisplay = document.getElementById('income-display');
    const calculateBtn = document.getElementById('calculate-btn');
    const calculatorResult = document.getElementById('calculator-result');
    
    // Actualizar displays de ranges
    function updateRangeDisplay(range, display) {
        const value = parseFloat(range.value);
        display.textContent = `R$ ${value.toLocaleString('pt-BR', {minimumFractionDigits: 0})}`;
    }
    
    // Inicializar displays
    if (propertyValue && propertyValueDisplay) {
        updateRangeDisplay(propertyValue, propertyValueDisplay);
    }
    
    if (downPayment && downPaymentDisplay) {
        updateRangeDisplay(downPayment, downPaymentDisplay);
    }
    
    if (income && incomeDisplay) {
        updateRangeDisplay(income, incomeDisplay);
    }
    
    // Event listeners para ranges
    if (propertyValue && propertyValueDisplay) {
        propertyValue.addEventListener('input', () => updateRangeDisplay(propertyValue, propertyValueDisplay));
    }
    
    if (downPayment && downPaymentDisplay) {
        downPayment.addEventListener('input', () => updateRangeDisplay(downPayment, downPaymentDisplay));
    }
    
    if (income && incomeDisplay) {
        income.addEventListener('input', () => updateRangeDisplay(income, incomeDisplay));
    }
    
    // Función de cálculo de financiamiento
    function calculateFinancing() {
        const valorImovel = parseFloat(propertyValue.value);
        const entrada = parseFloat(downPayment.value);
        const prazo = parseFloat(document.getElementById('loan-term').value);
        const taxaJuros = parseFloat(document.getElementById('interest-rate').value) / 100;
        
        // Calcular valor financiado
        const valorFinanciado = valorImovel - entrada;
        
        // Calcular parcela mensal (Sistema Price)
        const taxaMensal = Math.pow(1 + taxaJuros, 1/12) - 1;
        const numeroParcelas = prazo * 12;
        
        let parcelaMensal = 0;
        let totalEmprestimo = 0;
        
        if (valorFinanciado > 0 && taxaMensal > 0) {
            parcelaMensal = valorFinanciado * (taxaMensal * Math.pow(1 + taxaMensal, numeroParcelas)) / 
                          (Math.pow(1 + taxaMensal, numeroParcelas) - 1);
            totalEmprestimo = parcelaMensal * numeroParcelas;
        }
        
        // Actualizar resultados
        document.getElementById('result-financed').textContent = 
            `R$ ${valorFinanciado.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
        document.getElementById('result-monthly').textContent = 
            `R$ ${parcelaMensal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
        document.getElementById('result-total').textContent = 
            `R$ ${totalEmprestimo.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
        document.getElementById('result-rate').textContent = 
            `${(taxaJuros * 100).toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1})}% a.a.`;
        
        // Mostrar resultado
        calculatorResult.classList.add('active');
        
        // Scroll suave para resultado
        calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Event listener para botón calcular
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateFinancing);
    }
    
    // ===== SCROLL REVEAL PARA PÁGINA DE SIMULACIÓN =====
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.hero-simulate-content', { 
            origin: 'left',
            delay: 300 
        });
        
        ScrollReveal().reveal('.calculator-container', { 
            origin: 'bottom',
            delay: 300 
        });
        
        ScrollReveal().reveal('.bank-card', { 
            origin: 'bottom',
            interval: 150,
            scale: 0.9
        });
        
        ScrollReveal().reveal('.benefit-item', { 
            origin: 'bottom',
            interval: 150
        });
    }
});