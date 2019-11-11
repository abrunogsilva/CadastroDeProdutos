document.getElementById('form-add-produto').innerHTML = `
<p class="mt-5">
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Novo Produto
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    <form id="form-produto">
      <label for="nome">Nome:</label>
      <input type="text" class="form-control" id="nome"><br>

      <label for="descricao">Descrição:</label>
      <textarea class="form-control" id="descricao"></textarea><br>

      <label for="valor">Valor:</label>
      <input type="text" class="form-control" id="valor"><br>

      <label for="quantidade">Quantidade:</label>
      <select id="quantidade" class="form-control">
        <option> -- Selecione -- </option>
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
</div>
`;


$('#form-produto').submit((event) => {
    event.preventDefault();

    let produto = {
        nome: $('#nome').val(),
        valor: $('#valor').val(),
        descricao: $('#descricao').val(),
        quantidade: $('#quantidade').val(),
    };

    $.ajax({
        url: 'https://bruno-frontend.firebaseio.com/produto.json',
        type: 'POST',
        dataType: 'json',
        content: 'application/json',
        data: JSON.stringify(produto),
        success: (resposta) => {
            alert('Novo Produto Cadastrado');
            atualizarProdutos();
            $('[data-target="#collapseExample"]').click();

            $('#nome').val('');
            $('#valor').val('');
            $('#descricao').val('');
            $('#quantidade').val('');
        },
        error: (resposta) => {
            alert('Erro ao cadastrar produto');
        }
    });
});
