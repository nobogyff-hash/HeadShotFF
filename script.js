const tabela = document.getElementById('tabela');

const salvar = document.querySelector('.salvar');

const nome = document.getElementById('nome');
const telefone = document.getElementById('telefone');
const modelo = document.getElementById('modelo');
const imei = document.getElementById('imei');
const senha = document.getElementById('senha');
const defeito = document.getElementById('defeito');
const status = document.getElementById('status');
const valor = document.getElementById('valor');

const total = document.getElementById('total');
const analise = document.getElementById('analise');
const reparo = document.getElementById('reparo');
const concluido = document.getElementById('concluido');

let aparelhos =
  JSON.parse(localStorage.getItem('aparelhos')) || [];

function salvarLocalStorage(){
  localStorage.setItem(
    'aparelhos',
    JSON.stringify(aparelhos)
  );
}

function atualizarTabela(){

  tabela.innerHTML = '';

  let totalAnalise = 0;
  let totalReparo = 0;
  let totalConcluido = 0;

  aparelhos.forEach((item, index) => {

    tabela.innerHTML += `

      <tr>

        <td>#00${index + 1}</td>

        <td>${item.nome}</td>

        <td>${item.modelo}</td>

        <td>${item.defeito}</td>

        <td>
          <span class="status">
            ${item.status}
          </span>
        </td>

      </tr>

    `;

    if(item.status === 'Em análise'){
      totalAnalise++;
    }

    if(item.status === 'Em reparo'){
      totalReparo++;
    }

    if(item.status === 'Concluído'){
      totalConcluido++;
    }

  });

  total.innerText = aparelhos.length;
  analise.innerText = totalAnalise;
  reparo.innerText = totalReparo;
  concluido.innerText = totalConcluido;

}

salvar.addEventListener('click', () => {

  if(nome.value === '' || modelo.value === ''){
    alert('Preencha os campos');
    return;
  }

  const aparelho = {

    nome: nome.value,
    telefone: telefone.value,
    modelo: modelo.value,
    imei: imei.value,
    senha: senha.value,
    defeito: defeito.value,
    status: status.value,
    valor: valor.value

  };

  aparelhos.push(aparelho);

  salvarLocalStorage();

  atualizarTabela();

  nome.value = '';
  telefone.value = '';
  modelo.value = '';
  imei.value = '';
  senha.value = '';
  defeito.value = '';
  valor.value = '';

});

atualizarTabela();