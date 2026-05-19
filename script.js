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
const pagamento = document.getElementById('pagamento');
const entrada = document.getElementById('entrada');
const saida = document.getElementById('saida');
const observacoes = document.getElementById('observacoes');
const pesquisa = document.getElementById('pesquisa');

const total = document.getElementById('total');
const analise = document.getElementById('analise');
const reparo = document.getElementById('reparo');
const concluido = document.getElementById('concluido');

let aparelhos =
  JSON.parse(localStorage.getItem('aparelhos')) || [];

function salvarLocal(){
  localStorage.setItem(
    'aparelhos',
    JSON.stringify(aparelhos)
  );
}

function atualizarTabela(lista = aparelhos){

  tabela.innerHTML = '';

  let totalAnalise = 0;
  let totalReparo = 0;
  let totalConcluido = 0;

  lista.forEach((item, index) => {

    tabela.innerHTML += `

      <tr>

        <td>#00${index + 1}</td>

        <td>${item.nome}</td>

        <td>${item.modelo}</td>

        <td>
          <span class="status">
            ${item.status}
          </span>
        </td>

        <td>

          <div class="acoes">

            <button
              class="editar"
              onclick="editar(${index})">
              Editar
            </button>

            <button
              class="excluir"
              onclick="excluir(${index})">
              Excluir
            </button>

          </div>

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
    valor: valor.value,
    pagamento: pagamento.value,
    entrada: entrada.value,
    saida: saida.value,
    observacoes: observacoes.value

  };

  aparelhos.push(aparelho);

  salvarLocal();

  atualizarTabela();

  nome.value = '';
  telefone.value = '';
  modelo.value = '';
  imei.value = '';
  senha.value = '';
  defeito.value = '';
  valor.value = '';
  pagamento.value = '';
  entrada.value = '';
  saida.value = '';
  observacoes.value = '';

});

function excluir(index){

  aparelhos.splice(index, 1);

  salvarLocal();

  atualizarTabela();

}

function editar(index){

  const item = aparelhos[index];

  nome.value = item.nome;
  telefone.value = item.telefone;
  modelo.value = item.modelo;
  imei.value = item.imei;
  senha.value = item.senha;
  defeito.value = item.defeito;
  status.value = item.status;
  valor.value = item.valor;
  pagamento.value = item.pagamento;
  entrada.value = item.entrada;
  saida.value = item.saida;
  observacoes.value = item.observacoes;

  aparelhos.splice(index, 1);

  salvarLocal();

  atualizarTabela();

}

pesquisa.addEventListener('input', () => {

  const valorPesquisa =
    pesquisa.value.toLowerCase();

  const filtrados = aparelhos.filter(item =>

    item.nome.toLowerCase().includes(valorPesquisa) ||

    item.modelo.toLowerCase().includes(valorPesquisa)

  );

  atualizarTabela(filtrados);

});

atualizarTabela();