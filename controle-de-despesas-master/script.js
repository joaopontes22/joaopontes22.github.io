const elements = {
    saldo: document.getElementById('balance'),
    receitas: document.getElementById('money-plus'),
    despesas: document.getElementById('money-minus'),
    listaTransacoes: document.getElementById('transactions'),
    inputNome: document.getElementById('text'),
    inputValor: document.getElementById('amount'),
    formulario: document.getElementById('form')
  };
  
  let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
  
  function exibirTransacoes() {
    elements.listaTransacoes.innerHTML = '';
    transacoes.forEach(({ nome, valor }) => {
      const sinal = valor < 0 ? '-' : '+';
      const item = document.createElement('li');
      item.classList.add(valor < 0 ? 'minus' : 'plus');
      item.innerHTML = `${nome} <span>${sinal} R$${Math.abs(valor).toFixed(2)}</span>
        <button class="delete-btn" onclick="removerTransacao(${transacoes.indexOf({ nome, valor })})">x</button>`;
      elements.listaTransacoes.appendChild(item);
    });
  }
  
  function atualizarValores() {
    const valores = transacoes.map(transacao => transacao.valor);
    const total = valores.reduce((acumulador, item) => (acumulador += item), 0).toFixed(2);
    const entrada = valores.filter(item => item > 0).reduce((acumulador, item) => (acumulador += item), 0).toFixed(2);
    const saida = (valores.filter(item => item < 0).reduce((acumulador, item) => (acumulador += item), 0) * -1).toFixed(2);
    elements.saldo.textContent = `R$${total}`;
    elements.receitas.textContent = `+ R$${entrada}`;
    elements.despesas.textContent = `- R$${saida}`;
  }
  
  function adicionarTransacao(e) {
    e.preventDefault();
    const { inputNome, inputValor } = elements;
    if (inputNome.value.trim() === '' || inputValor.value.trim() === '') {
      alert('Por favor, preencha os campos "Nome" e "Valor"');
    } else {
      transacoes.push({ id: transacoes.length + 1, nome: inputNome.value, valor: +inputValor.value });
      localStorage.setItem('transacoes', JSON.stringify(transacoes));
      exibirTransacoes();
      atualizarValores();
      inputNome.value = '';
      inputValor.value = '';
    }
  }
  
  function removerTransacao(index) {
    transacoes.splice(index, 1);
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
    exibirTransacoes();
    atualizarValores();
  }
  
  elements.formulario.addEventListener('submit', adicionarTransacao);
  exibirTransacoes();
  atualizarValores();
  