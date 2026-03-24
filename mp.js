// SEM Service Worker - sempre busca versão nova
const balanceAmount = document.querySelector('.balance-amount');
const eyeBtn = document.querySelector('.eye-btn');
const currency = document.querySelector('.currency');
let isHidden = false;
let savedValue = localStorage.getItem('mp_saldo') || '0,00';

// Função para ajustar tamanho do texto baseado no comprimento
function adjustFontSize() {
    const balanceValue = document.querySelector('.value');
    const currency = document.querySelector('.currency');
    const eyeBtn = document.querySelector('.eye-btn');
    const balanceAmount = document.querySelector('.balance-amount');
    
    if (!balanceValue || !balanceAmount) return;
    
    const textLength = balanceValue.textContent.length;
    const containerWidth = balanceAmount.offsetWidth;
    
    // Calcula tamanho baseado no comprimento E na largura disponível
    let currencySize, valueSize, eyeSize;
    
    if (textLength <= 4) {
        currencySize = 32;
        valueSize = 56;
        eyeSize = 32;
    } else if (textLength <= 7) {
        currencySize = 30;
        valueSize = 52;
        eyeSize = 30;
    } else if (textLength <= 10) {
        currencySize = 26;
        valueSize = 44;
        eyeSize = 28;
    } else if (textLength <= 13) {
        currencySize = 22;
        valueSize = 36;
        eyeSize = 24;
    } else if (textLength <= 17) {
        currencySize = 18;
        valueSize = 30;
        eyeSize = 22;
    } else {
        currencySize = 16;
        valueSize = 26;
        eyeSize = 20;
    }
    
    // Ajuste adicional se ainda estiver muito largo
    if (containerWidth < 300) {
        const scale = containerWidth / 300;
        currencySize = Math.floor(currencySize * scale);
        valueSize = Math.floor(valueSize * scale);
        eyeSize = Math.floor(eyeSize * scale);
    }
    
    currency.style.fontSize = currencySize + 'px';
    balanceValue.style.fontSize = valueSize + 'px';
    eyeBtn.querySelector('svg').style.width = eyeSize + 'px';
    eyeBtn.querySelector('svg').style.height = eyeSize + 'px';
}

// Função para atualizar display do saldo com centavos em superscript
function setSaldo(val) {
    const partes = val.split(',');
    const reaisEl = document.getElementById('saldo-reais-mp');
    const centEl = document.getElementById('saldo-centavos-mp');
    if (reaisEl) reaisEl.textContent = partes[0];
    if (centEl) centEl.textContent = partes[1] || '00';
}

// Inicializa o valor formatado
window.addEventListener('DOMContentLoaded', () => {
    setSaldo(savedValue);
    adjustFontSize();
});

// Ajusta quando a janela redimensionar
window.addEventListener('resize', () => {
    adjustFontSize();
});

// Ajusta quando o app voltar do background (PWA)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        adjustFontSize();
    }
});

// Função para formatar valor como dinheiro
function formatMoney(value) {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers === '' || numbers === '0') return '0,00';
    
    const cents = parseInt(numbers);
    const reais = Math.floor(cents / 100);
    const centavos = cents % 100;
    
    const reaisFormatted = reais.toLocaleString('pt-BR');
    const centavosFormatted = centavos.toString().padStart(2, '0');
    
    return `${reaisFormatted},${centavosFormatted}`;
}

// Função para esconder/mostrar saldo
eyeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const balanceValue = document.querySelector('.value');
    isHidden = !isHidden;
    
    if (isHidden) {
        savedValue = document.getElementById('saldo-reais-mp').textContent + ',' + document.getElementById('saldo-centavos-mp').textContent;
        document.getElementById('saldo-reais-mp').textContent = '••••';
        document.getElementById('saldo-centavos-mp').textContent = '';
        currency.style.visibility = 'hidden';
        eyeBtn.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2D3748" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
        `;
    } else {
        setSaldo(savedValue);
        currency.style.visibility = 'visible';
        eyeBtn.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2D3748" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        `;
        adjustFontSize();
    }
});

// Editar saldo
balanceAmount.addEventListener('click', (e) => {
    if (e.target.closest('.eye-btn')) return;
    if (isHidden) return;
    
    const balanceValue = document.querySelector('.value');
    if (!balanceValue) return;
    
    const currentValue = balanceValue.textContent;
    const numbersOnly = currentValue.replace(/\D/g, '');
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = numbersOnly;
    input.style.fontSize = '48px';
    input.style.fontWeight = '700';
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.width = '100%';
    input.style.maxWidth = '280px';
    input.style.background = 'transparent';
    input.style.color = '#2D3748';
    input.style.letterSpacing = '-1px';
    
    balanceValue.replaceWith(input);
    input.focus();
    input.select();
    
    input.addEventListener('input', (e) => {
        const formatted = formatMoney(e.target.value);
        e.target.value = formatted;
        e.target.setSelectionRange(formatted.length, formatted.length);
    });
    
    input.addEventListener('blur', () => {
        const newValue = formatMoney(input.value);
        savedValue = newValue;
        localStorage.setItem('mp_saldo', newValue);
        const span = document.createElement('span');
        span.className = 'value';
        span.innerHTML = `<strong id="saldo-reais-mp"></strong><sup id="saldo-centavos-mp"></sup>`;
        input.replaceWith(span);
        setSaldo(newValue);
        adjustFontSize();
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        }
    });
});
