const API = '/api/discos';

const form = document.getElementById('form-disco');
const btnCancelar = document.getElementById('btnCancelar');
const tbody = document.querySelector('#tabela tbody');

async function listar() {
  const res = await fetch(API);
  const dados = await res.json();
  tbody.innerHTML = '';
  for (const d of dados) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${d.titulo}</td>
      <td>${d.artista}</td>
      <td>${d.ano}</td>
      <td>${d.genero}</td>
      <td>${d.formato}</td>
      <td>R$ ${Number(d.preco).toFixed(2)}</td>
      <td class="actions-row">
        <button onclick="editar('${d._id}')">Editar</button>
        <button class="secondary" onclick="excluirD('${d._id}')">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

async function editar(id) {
  const res = await fetch(`${API}/${id}`);
  const d = await res.json();
  document.getElementById('id').value = d._id;
  document.getElementById('titulo').value = d.titulo;
  document.getElementById('artista').value = d.artista;
  document.getElementById('ano').value = d.ano;
  document.getElementById('genero').value = d.genero;
  document.getElementById('formato').value = d.formato;
  document.getElementById('preco').value = d.preco;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function excluirD(id) {
  if (!confirm('Tem certeza que deseja excluir?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  await listar();
  limparFormulario();
}

function limparFormulario() {
  form.reset();
  document.getElementById('id').value = '';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    titulo: document.getElementById('titulo').value.trim(),
    artista: document.getElementById('artista').value.trim(),
    ano: Number(document.getElementById('ano').value),
    genero: document.getElementById('genero').value.trim(),
    formato: document.getElementById('formato').value,
    preco: Number(document.getElementById('preco').value)
  };

  const id = document.getElementById('id').value;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API}/${id}` : API;

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    alert(err.error || 'Erro ao salvar');
    return;
  }

  await listar();
  limparFormulario();
});

btnCancelar.addEventListener('click', limparFormulario);

listar();
