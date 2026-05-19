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

  const janela = window.open('', '', 'width=900,height=1000');

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
        padding:18px;
        color:#000;
        font-size:11px;
      }

      .topo{
        text-align:center;
        margin-bottom:15px;
      }

      .topo h1{
        font-size:24px;
      }

      .topo p{
        color:#555;
        margin-top:3px;
      }

      .os{
        margin-top:10px;
        margin-bottom:15px;
        font-weight:bold;
      }

      .box{
        border:1px solid #000;
        padding:10px;
        border-radius:8px;
        margin-bottom:10px;
      }

      .grid{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:8px;
      }

      .linha{
        margin-bottom:6px;
      }

      .titulo{
        font-weight:bold;
      }

      .defeito,
      .obs{
        min-height:50px;
        border:1px solid #000;
        padding:8px;
        margin-top:5px;
      }

      .termos{
        margin-top:12px;
        font-size:10px;
        line-height:15px;
      }

      .assinaturas{
        margin-top:40px;

        display:flex;
        justify-content:space-between;
      }

      .assinaturas div{
        text-align:center;
      }

      .rodape{
        margin-top:15px;
        text-align:center;
        font-size:10px;
        color:#555;
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

      <p>Assistência Técnica Especializada</p>

    </div>

    <div class="os">

      ORDEM DE SERVIÇO #00${index + 1}

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
          <span class="titulo">Modelo:</span>
          ${item.modelo}
        </div>

        <div class="linha">
          <span class="titulo">IMEI:</span>
          ${item.imei}
        </div>

        <div class="linha">
          <span class="titulo">Senha/Padrão:</span>
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

    </div>

    <div class="linha">

      <span class="titulo">
        Defeito Relatado:
      </span>

      <div class="defeito">

        ${item.defeito}

      </div>

    </div>

    <br>

    <div class="linha">

      <span class="titulo">
        Observações Técnicas:
      </span>

      <div class="obs">

        ${item.observacoes}

      </div>

    </div>

    <div class="termos">

      <p>
        1. A garantia cobre apenas o serviço executado pela assistência técnica.
      </p>

      <p>
        2. A garantia perde validade em casos de queda, oxidação, mau uso ou violação do aparelho.
      </p>

      <p>
        3. O prazo de garantia é de 90 dias referente ao reparo realizado.
      </p>

      <p>
        4. A assistência não se responsabiliza por acessórios deixados junto ao aparelho sem descrição nesta OS.
      </p>

      <p>
        5. Equipamentos não retirados em até 90 dias poderão sofrer cobrança de armazenamento.
      </p>

    </div>

    <div class="assinaturas">

      <div>

        __________________________

        <br><br>

        Assinatura do Cliente

      </div>

      <div>

        __________________________

        <br><br>

        Prime Tech

      </div>

    </div>

    <div class="rodape">

      Prime Tech - Sistema de Assistência Técnica

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