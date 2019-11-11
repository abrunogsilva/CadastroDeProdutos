$(document).on('click', '[data-toggle="editar"]', () => {
    $('#form-add-produto').fadeOut();
    $('#tabela-produtos').fadeOut();

    let id = $('[data-toggle="editar"]:focus').attr('data-id');

    $.ajax({
      url: `https://bruno-frontend.firebaseio.com/produto/${id}.json`,
      type: 'GET',
      content: 'application/json',
      success: (resposta) => {
          mostrarFormEditar(resposta, id);
      },
      error: (resposta) => {
          alert('Erro ao buscar os dados do produto');
      }
    });

    $(document).on('click', '#cancelar-editar', () => {
      $('#editar-produto').html('');

      $('#form-add-produto').fadeIn();
      $('#tabela-produtos').fadeIn();
    });
});

const mostrarFormEditar = (resposta, id) => {
    $('#editar-produto').html(`
        <br>
        <a href="#" class="btn btn-outline-primary" id="cancelar-editar">
            Cancelar
        </a>

        <br>

        <div class="card card-body">
          <form id="form-editar-produto">
            <input type="hidden" id="editar-id" value="${id}">

            <label for="editar-nome">Nome:</label>
            <input type="text" value="${resposta.nome}" class="form-control" id="editar-nome"><br>

            <label for="editar-descricao">Descrição:</label>
            <textarea class="form-control" id="editar-descricao">${resposta.descricao}</textarea><br>

            <label for="editar-valor">Valor:</label>
            <input type="text" class="form-control" id="editar-valor" value="${resposta.valor}"><br>

            <label for="editar-quantidade">Quantidade:</label>
            <select id="editar-quantidade" class="form-control">
              <option selected>${resposta.quantidade}</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <br>

            <button class="btn btn-primary">ENVIAR</button>
          </form>
        </div>
    `);
};

$(document).on('submit', '#form-editar-produto', () => {
    let produto = {
      nome: $('#editar-nome').val(),
      descricao: $('#editar-descricao').val(),
      valor: $('#editar-valor').val(),
      quantidade: $('#editar-quantidade').val(),
    };

    let id = $('#editar-id').val();

    $.ajax({
      url: `https://bruno-frontend.firebaseio.com/produto/${id}.json`,
      type: 'PUT',
      content: 'application/json',
      dataType: 'json',
      data: JSON.stringify(produto),
      success: (resposta) => {
        $('#cancelar-editar').click();

        atualizarProdutos();
      },
      error: (resposta) => {
          alert('Erro ao editar produto');
      }
    })
});
