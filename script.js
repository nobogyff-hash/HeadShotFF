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

let contador = 0;

salvar.addEventListener('click', () => {

  if(nome.value === '' || modelo.value === ''){
    alert('Preencha os campos');
    return;
  }

  contador++;

  tabela.innerHTML += `

    <tr>

      <td>#00${contador}</td>

      <td>${nome.value}</td>

      <td>${modelo.value}</td>

      <td>${defeito.value}</td>

      <td>
        <span class="status">
          ${status.value}
        </span>
      </td>

    </tr>

  `;

  atualizarCards();

  nome.value = '';
  telefone.value = '';
  modelo.value = '';
  imei.value = '';
  senha.value = '';
  defeito.value = '';
  valor.value = '';

});

function atualizarCards(){

  total.innerText = contador;

  if(status.value === 'Em análise'){
    analise.innerText =
      Number(analise.innerText) + 1;
  }

  if(status.value === 'Em reparo'){
    reparo.innerText =
      Number(reparo.innerText) + 1;
  }

  if(status.value === 'Concluído'){
    concluido.innerText =
      Number(concluido.innerText) + 1;
  }

}