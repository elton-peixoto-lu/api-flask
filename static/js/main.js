const app = document.getElementById('app');
const ul = document.createElement('ul');
app.appendChild(ul);

const inputNome = document.createElement('input');
inputNome.type = 'text';
inputNome.placeholder = 'Nome do Filme';
app.appendChild(inputNome);

const inputDescricao = document.createElement('input');
inputDescricao.type = 'text';
inputDescricao.placeholder = 'Descrição do Filme';
app.appendChild(inputDescricao);

const button = document.createElement('button');
button.textContent = 'Adicionar Filme';
app.appendChild(button);

async function getFilmes() {
    const response = await fetch('/api/filmes');
    const filmes = await response.json();
    ul.innerHTML = '';
    filmes.forEach(filme => {
        const li = document.createElement('li');
        li.innerHTML = `<b>${filme.name}</b>: ${filme.description}`;
        ul.appendChild(li);
    });
}

async function adicionarFilme() {
    const novoFilme = {
        name: inputNome.value,
        description: inputDescricao.value
    };
    const response = await fetch('/api/filmes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoFilme)
    });
    if (response.ok) { // Verifica se a requisição foi bem-sucedida
        inputNome.value = '';
        inputDescricao.value = '';
        getFilmes();
    } else {
        alert('Erro ao adicionar filme!');
    }
}

button.addEventListener('click', adicionarFilme);
getFilmes(); 
