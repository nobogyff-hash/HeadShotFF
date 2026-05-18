const aparelhos = [

  {
    os:'001',
    cliente:'Carlos',
    aparelho:'iPhone 11',
    defeito:'Tela quebrada',
    status:'Em análise'
  },

  {
    os:'002',
    cliente:'Marcos',
    aparelho:'Samsung A14',
    defeito:'Não liga',
    status:'Em reparo'
  },

  {
    os:'003',
    cliente:'João',
    aparelho:'Moto G53',
    defeito:'Molhado',
    status:'Concluído'
  }

];

const tabela = document.getElementById('tabela');

aparelhos.forEach(item => {

  tabela.innerHTML += `

    <tr>

      <td>#${item.os}</td>

      <td>${item.cliente}</td>

      <td>${item.aparelho}</td>

      <td>${item.defeito}</td>

      <td>
        <span class="status">
          ${item.status}
        </span>
      </td>

    </tr>

  `;

});