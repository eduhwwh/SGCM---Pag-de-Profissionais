window.addEventListener('DOMContentLoaded', () => {
    const tabela = document.getElementById('Prof').getElementsByTagName('tbody')[0];
    const form = document.getElementById('formProf');
    const btnEnviar = form.querySelector('input[type="submit"]');
    const mostrar = document.getElementById('botaoAdd');
    const cancelar = document.getElementById('cancele');

    function carregarProfissionais() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://my-json-server.typicode.com/juniorlimeiras/json/profissionais');
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let dados = JSON.parse(xhr.responseText);

                for (let item of dados) {
                    let linha = document.createElement('tr');
                    let id = document.createElement('td');
                    let nome = document.createElement('td');
                    let registro = document.createElement('td');
                    let telefone = document.createElement('td');
                    let email = document.createElement('td');
                    let unidade = document.createElement('td');
                    let especialidade = document.createElement('td');
                    let opcoes = document.createElement('td');

                    id.textContent = item.id;
                    nome.textContent = item.nome;
                    registro.textContent = item.registro;
                    telefone.textContent = item.telefone;
                    email.textContent = item.email;
                    unidade.textContent = item.unidade;
                    especialidade.textContent = item.especialidade;
                    opcoes.innerHTML = `<a class="botao_verde" href="javascript:void(0)">Editar</a> | <a class="botao_vermelho" href="javascript:void(0)">Excluir</a>`;

                    linha.appendChild(id);
                    linha.appendChild(nome);
                    linha.appendChild(registro);
                    linha.appendChild(telefone);
                    linha.appendChild(email);
                    linha.appendChild(unidade);
                    linha.appendChild(especialidade);
                    linha.appendChild(opcoes);
                    tabela.appendChild(linha);
                }

                excluirLinha();
            }
        });
        xhr.send();
    }

    function inserirProfissional(item) {
        const linha = document.createElement('tr');
        const contNumero = tabela.rows.length + 1;

        let id = document.createElement('td');
        let nome = document.createElement('td');
        let registro = document.createElement('td');
        let telefone = document.createElement('td');
        let email = document.createElement('td');
        let unidade = document.createElement('td');
        let especialidade = document.createElement('td');
        let opcoes = document.createElement('td');

        id.textContent = contNumero;
        nome.textContent = item.nome;
        registro.textContent = item.registro;
        telefone.textContent = item.telefone;
        email.textContent = item.email;
        unidade.textContent = item.unidade;
        especialidade.textContent = item.especialidade;
        opcoes.innerHTML = `<a class="botao_verde" href="javascript:void(0)">Editar</a> | <a class="botao_vermelho" href="javascript:void(0)">Excluir</a>`;

        linha.appendChild(id);
        linha.appendChild(nome);
        linha.appendChild(registro);
        linha.appendChild(telefone);
        linha.appendChild(email);
        linha.appendChild(unidade);
        linha.appendChild(especialidade);
        linha.appendChild(opcoes);
        tabela.appendChild(linha);

        excluirLinha();

        ProfissionalCadastrado();
        form.classList.add('esconder');
        mostrar.classList.remove('esconder');
    }

    function ProfissionalCadastrado() {
        alert("Profissional adicionado!");
    }

    function excluirLinha() {
        const botoesExcluir = document.querySelectorAll('a.botao_vermelho');
        for (let botao of botoesExcluir) {
            botao.addEventListener('click', () => {
                botao.parentElement.parentElement.remove();
            });
        }
    }

    //botão de adicionar
    mostrar.addEventListener('click', () => {
        form.classList.remove('esconder');
        mostrar.classList.add('esconder');
        form.reset();
    });

    //botão cancelar
    cancelar.addEventListener('click', () => {
        form.classList.add('esconder');
        mostrar.classList.remove('esconder');
    });

    //enviar o formulário
    btnEnviar.addEventListener('click', (event) => {
        event.preventDefault();

        const item = {
            nome: form.nome.value,
            registro: form.registroConselho.value,
            telefone: form.telefone.value,
            email: form.email.value,
            unidade: form.unidade.options[form.unidade.selectedIndex].label,
            especialidade: form.especialidade.options[form.especialidade.selectedIndex].label
        };

        inserirProfissional(item);
    });

    carregarProfissionais();
});
