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

            <button
              class="editar"
              onclick="imprimir(${index})">
              Imprimir
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

function imprimir(index){

  const item = aparelhos[index];

  const janela = window.open('', '', 'width=800,height=900');

  janela.document.write(`

    <html>

    <head>

      <title>Ordem de Serviço</title>

      <style>

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:Arial;
        }

        body{
          padding:15px;
          color:#000;
          font-size:12px;
        }

        .topo{
          text-align:center;
          margin-bottom:15px;
        }

        .topo h1{
          font-size:22px;
        }

        .topo p{
          font-size:12px;
          color:#555;
        }

        .box{
          border:1px solid #000;
          padding:12px;
          border-radius:10px;
          margin-bottom:10px;
        }

        .linha{
          margin-bottom:6px;
        }

        .titulo{
          font-weight:bold;
        }

        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
        }

        .garantia{
          margin-top:10px;
          font-size:11px;
          line-height:16px;
        }

        .assinaturas{
          margin-top:30px;

          display:flex;
          justify-content:space-between;

          font-size:11px;
        }

        @media print{

          body{
            padding:10px;
          }

        }

      </style>

    </head>

    <body>

      <div class="topo">

        <h1>Prime Tech</h1>

        <p>Ordem de Serviço</p>

      </div>

      <div class="box">

        <div class="grid">

          <div class="linha">
            <span class="titulo">Cliente:</span>
            ${item.nome}
          </div>

          <div class="linha">
            <span class="titulo">Telefone:</span>
            ${item.telefone}
          </div>

          <div class="linha">
            <span class="titulo">Aparelho:</span>
            ${item.modelo}
          </div>

          <div class="linha">
            <span class="titulo">IMEI:</span>
            ${item.imei}
          </div>

          <div class="linha">
            <span class="titulo">Senha:</span>
            ${item.senha}
          </div>

          <div class="linha">
            <span class="titulo">Status:</span>
            ${item.status}
          </div>

          <div class="linha">
            <span class="titulo">Valor:</span>
            R$ ${item.valor}
          </div>

          <div class="linha">
            <span class="titulo">Pagamento:</span>
            ${item.pagamento}
          </div>

          <div class="linha">
            <span class="titulo">Entrada:</span>
            ${item.entrada}
          </div>

          <div class="linha">
            <span class="titulo">Saída:</span>
            ${item.saida}
          </div>

        </div>

        <br>

        <div class="linha">
          <span class="titulo">Defeito:</span>
          ${item.defeito}
        </div>

        <br>

        <div class="linha">
          <span class="titulo">Observações:</span>
          ${item.observacoes}
        </div>

      </div>

      <div class="garantia">

        <p>
          Garantia de 90 dias referente ao serviço executado.
        </p>

        <p>
          A garantia perde validade em casos de queda,
          oxidação, violação ou mau uso do aparelho.
        </p>

      </div>

      <div class="assinaturas">

        <div>
          _______________________
          <br><br>
          Cliente
        </div>

        <div>
          _______________________
          <br><br>
          Prime Tech
        </div>

      </div>

    </body>

    </html>

  `);

  janela.document.close();

  janela.print();

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