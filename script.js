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

      @page{
        size:A4;
        margin:8mm;
      }

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:Arial;
      }

      body{
        padding:10px;
        color:#000;
        font-size:10px;
      }

      .topo{
        border:2px solid #000;
        padding:10px;
        margin-bottom:10px;
      }

      .topo h1{
        text-align:center;
        font-size:22px;
      }

      .topo p{
        text-align:center;
        font-size:11px;
      }

      .os{
        margin-top:5px;
        text-align:right;
        font-weight:bold;
      }

      .box{
        border:1px solid #000;
        margin-bottom:8px;
      }

      .titulo-box{
        background:#eee;
        padding:4px;
        font-weight:bold;
        border-bottom:1px solid #000;
      }

      .conteudo{
        padding:6px;
      }

      .grid{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:5px 15px;
      }

      .linha{
        line-height:15px;
      }

      .checklist{
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:4px;
        margin-top:5px;
      }

      .check{
        border:1px solid #000;
        padding:3px;
      }

      .area{
        border:1px solid #000;
        min-height:45px;
        padding:5px;
        margin-top:4px;
      }

      .termos{
        font-size:9px;
        line-height:13px;
      }

      .assinaturas{
        margin-top:25px;

        display:flex;
        justify-content:space-between;

        text-align:center;
      }

      .assinaturas div{
        width:40%;
      }

      .linha-ass{
        border-top:1px solid #000;
        margin-top:30px;
        padding-top:5px;
      }

    </style>

  </head>

  <body>

    <div class="topo">

      <h1>PRIME TECH</h1>

      <p>Assistência Técnica Especializada</p>

      <div class="os">

        ORDEM DE SERVIÇO #00${index + 1}

      </div>

    </div>

    <div class="box">

      <div class="titulo-box">
        DADOS DO CLIENTE
      </div>

      <div class="conteudo">

        <div class="grid">

          <div class="linha">
            <b>Cliente:</b> ${item.nome}
          </div>

          <div class="linha">
            <b>Telefone:</b> ${item.telefone}
          </div>

          <div class="linha">
            <b>Entrada:</b> ${item.entrada}
          </div>

          <div class="linha">
            <b>Saída:</b> ${item.saida}
          </div>

        </div>

      </div>

    </div>

    <div class="box">

      <div class="titulo-box">
        DADOS DO APARELHO
      </div>

      <div class="conteudo">

        <div class="grid">

          <div class="linha">
            <b>Modelo:</b> ${item.modelo}
          </div>

          <div class="linha">
            <b>IMEI:</b> ${item.imei}
          </div>

          <div class="linha">
            <b>Senha:</b> ${item.senha}
          </div>

          <div class="linha">
            <b>Status:</b> ${item.status}
          </div>

          <div class="linha">
            <b>Valor:</b> R$ ${item.valor}
          </div>

          <div class="linha">
            <b>Pagamento:</b> ${item.pagamento}
          </div>

        </div>

      </div>

    </div>

    <div class="box">

      <div class="titulo-box">
        CHECKLIST DO APARELHO
      </div>

      <div class="conteudo">

        <div class="checklist">

          <div class="check">☐ Tela quebrada</div>
          <div class="check">☐ Sem imagem</div>
          <div class="check">☐ Não liga</div>

          <div class="check">☐ Oxidação</div>
          <div class="check">☐ Sem áudio</div>
          <div class="check">☐ Face ID</div>

          <div class="check">☐ Biometria</div>
          <div class="check">☐ Câmera</div>
          <div class="check">☐ Botões</div>

        </div>

      </div>

    </div>

    <div class="box">

      <div class="titulo-box">
        DEFEITO RELATADO
      </div>

      <div class="conteudo">

        <div class="area">

          ${item.defeito}

        </div>

      </div>

    </div>

    <div class="box">

      <div class="titulo-box">
        OBSERVAÇÕES TÉCNICAS
      </div>

      <div class="conteudo">

        <div class="area">

          ${item.observacoes}

        </div>

      </div>

    </div>

    <div class="box">

      <div class="titulo-box">
        TERMOS DE GARANTIA
      </div>

      <div class="conteudo termos">

        <p>
          1. Garantia válida por 90 dias referente ao serviço executado.
        </p>

        <p>
          2. Perda da garantia em casos de queda, oxidação ou violação do aparelho.
        </p>

        <p>
          3. A assistência não se responsabiliza por acessórios não descritos.
        </p>

        <p>
          4. Equipamentos abandonados por mais de 90 dias poderão sofrer cobrança.
        </p>

      </div>

    </div>

    <div class="assinaturas">

      <div>

        <div class="linha-ass">
          Assinatura do Cliente
        </div>

      </div>

      <div>

        <div class="linha-ass">
          Prime Tech
        </div>

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