document.getElementById('generate').addEventListener('click', generatePassword);
document.getElementById('copyPassword').addEventListener('click', copyPassword);

function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;

    // Definindo o limite máximo de 20 caracteres
    const maxLength = 20;

    // Verificando se o comprimento excede o limite máximo
    if (length > maxLength) {
        alert('O comprimento máximo da senha é de 20 caracteres!');
        return;
    }

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charPool = '';
    let criteriaCount = 0;

    if (includeUppercase) {
        charPool += uppercaseChars;
        criteriaCount++;
    }
    if (includeLowercase) {
        charPool += lowercaseChars;
        criteriaCount++;
    }
    if (includeNumbers) {
        charPool += numberChars;
        criteriaCount++;
    }
    if (includeSymbols) {
        charPool += symbolChars;
        criteriaCount++;
    }

    if (charPool === '') {
        alert('Por favor, selecione pelo menos um critério!');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    document.getElementById('passwordResult').innerText = password;

    evaluatePasswordStrength(length, criteriaCount);
}

function evaluatePasswordStrength(length, criteriaCount) {
    const strengthElement = document.getElementById('passwordStrength');
    
    if (length < 8 || criteriaCount < 2) {
        strengthElement.innerText = 'Força da Senha: Fraca';
        strengthElement.style.color = 'red';
    } else if (length < 12 || criteriaCount < 3) {
        strengthElement.innerText = 'Força da Senha: Média';
        strengthElement.style.color = 'orange';
    } else {
        strengthElement.innerText = 'Força da Senha: Forte';
        strengthElement.style.color = 'green';
    }
}

function copyPassword() {
    const password = document.getElementById('passwordResult').innerText;
    if (!password) {
        alert('Nenhuma senha gerada para copiar!');
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        alert('Senha copiada para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar a senha: ', err);
    });
}
