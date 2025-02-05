lucide.createIcons();

const amountButtons = document.querySelectorAll('.amount-btn');
const pixKeyInput = document.getElementById('pixKey');
const keyTypeSelect = document.getElementById('keyType');
const submitButton = document.querySelector('.submit-btn');

const formatters = {
  cpf: (value) => {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value.slice(0, 14);
  },
  phone: (value) => {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    return value.slice(0, 15);
  },
  email: (value) => value.toLowerCase()
};

const validators = {
  cpf: (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11;
  },
  phone: (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11;
  },
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
};

function showNotification(message) {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

amountButtons.forEach(button => {
  button.addEventListener('click', () => {
    amountButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});

keyTypeSelect.addEventListener('change', () => {
  const keyType = keyTypeSelect.value;
  pixKeyInput.value = '';
  
  if (keyType) {
    pixKeyInput.placeholder = `Digite seu ${keyType.toUpperCase()}`;
  } else {
    pixKeyInput.placeholder = 'Digite a sua chave PIX';
  }
});

pixKeyInput.addEventListener('input', (e) => {
  const keyType = keyTypeSelect.value;
  if (keyType && formatters[keyType]) {
    const formattedValue = formatters[keyType](e.target.value);
    e.target.value = formattedValue;
  }
});

function simulateRequest() {
  return new Promise(resolve => {
    setTimeout(resolve, 1500); 
  });
}

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  
  const selectedAmount = document.querySelector('.amount-btn.selected').dataset.amount;
  const keyType = keyTypeSelect.value;
  const pixKey = pixKeyInput.value;

  if (!keyType) {
    showNotification('Por favor, selecione o tipo de chave PIX');
    return;
  }

  if (!pixKey) {
    showNotification('Por favor, digite sua chave PIX');
    return;
  }

  if (validators[keyType] && !validators[keyType](pixKey)) {
    showNotification(`Formato de ${keyType.toUpperCase()} inválido`);
    return;
  }

  const originalText = submitButton.textContent;
  
  submitButton.classList.add('loading');
  submitButton.disabled = true;

  try {
    await simulateRequest();
    
    sessionStorage.setItem('withdrawalData', JSON.stringify({
      amount: selectedAmount,
      keyType,
      pixKey
    }));

    window.location.href = 'taxa.html';
  } catch (error) {
    submitButton.classList.remove('loading');
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    
    showNotification('Erro ao processar o saque. Tente novamente.');
  }
});