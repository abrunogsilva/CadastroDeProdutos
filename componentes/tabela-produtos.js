document.getElementById('tabela-produtos').innerHTML = `

<table class="table table-hover table-striped">
  <thead class="thead-dark">
    <tr>
      <th>Nome</th>
      <th>Descrição</th>
      <th>Valor</th>
      <th>Quantidade</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody id="produtos">

  </tbody>
</table>

<!-- Modal -->
<div class="modal fade" id="modalExcluirProduto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Excluir Produto?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="alert alert-danger">
          <strong>Cuidado!</strong> Essa ação é irreversível.
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" id="confirmarExcluir" class="btn btn-primary">Confirmar</button>
      </div>
    </div>
  </div>
</div>

`;

const atualizarProdutos = () => {

  $.ajax({
  url: 'https://bruno-frontend.firebaseio.com/produto.json',
  type: 'GET',
  content: 'application/json',
  success: (resposta) => {
      $('#produtos').html('');

      for (let id in resposta) {
          let produto = resposta[id];

          $('#produtos').append(`
            <tr>
              <td>${produto.nome}</td>
              <td>${produto.descricao}</td>
              <td>${produto.valor}</td>
              <td>${produto.quantidade}</td>
              <td>
                <a href="#" data-id="${id}" data-toggle="excluir" class="btn btn-danger">Excluir</a>
                <a href="#" data-id="${id}" data-toggle="editar" class="btn btn-warning">Editar</a>
              </td>
            </tr>
          `);
      }
  },
  error: (resposta) => {
    alert('não foi possivel carregar a lista de produtos');
  }
});

};


$(document).on('click', '[data-toggle="excluir"]', () => {
  $('#modalExcluirProduto').modal();

  let id = $('[data-toggle="excluir"]:focus').attr('data-id');

  $('#confirmarExcluir').click(() => {
      $.ajax({
        url: `https://bruno-frontend.firebaseio.com/produto/${id}.json`,
        type: 'DELETE',
        content: 'application/json',
        success: () => {
            atualizarProdutos();
            $('#modalExcluirProduto').modal('hide');
        },
        error: () => {
            alert('Ops, erro ao excluir o produto.');
        }
      })
  });
});


atualizarProdutos();
