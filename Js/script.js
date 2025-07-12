function carregarProfissionais() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://my-json-server.typicode.com/juniorlimeiras/json/profissionais');
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let dados = JSON.parse(xhr.responseText);
            // let tabela = document.querySelector('table');
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
                opcoes.innerHTML = `<a class="botao_verde" href="">Editar</a>|<a class="botao_vermelho" href="javascript:void(0)">Excluir</a>`;

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
        }

        // atualizar();
        excluirLinha();
        editarLinha();


    });//Fecha o escutador de evento
    xhr.send();
}


carregarProfissionais();

let tabela = document.querySelector('table');
let form = document.querySelector('form');
let btn_enviar = document.querySelector('input[type="submit"]');
btn_enviar.addEventListener('click', (event) => {

    event.preventDefault(); //evita que a pagina seja recarregada

    //let objeto = new Object();
    let objeto = {
        // id:
        nome: form.nome.value,
        registro: form.registroConselho.value,
        telefone: form.telefone.value,
        email: form.email.value,
        unidade: form.unidade.options[form.unidade.selectedIndex].label,
        especialidade: form.especialidade.options[form.especialidade.selectedIndex].label
    }
    inserirProfissional(objeto);
});

const inserirProfissional = (item) => {
    // let tabela = document.querySelector('table');
    let linha = document.createElement('tr');
    let id = document.createElement('td');
    let nome = document.createElement('td');
    let registro = document.createElement('td');
    let telefone = document.createElement('td');
    let email = document.createElement('td');
    let unidade = document.createElement('td');
    let especialidade = document.createElement('td');
    let opcoes = document.createElement('td');


    // const contNumero = tabela.querySelectorAll('tr'). length + 1; contar os numeros de profis adicionados

    id.textContent = contNumero;
    nome.textContent = item.nome;
    registro.textContent = item.registro;
    telefone.textContent = item.telefone;
    email.textContent = item.email;
    unidade.textContent = item.unidade;
    especialidade.textContent = item.especialidade;
    opcoes.innerHTML = `<a class="botao_verde" href="javascript:void(0)">Editar</a>|<a class="botao_vermelho" href="javascript:void(0)">Excluir</a>`;

    linha.appendChild(id);
    linha.appendChild(nome);
    linha.appendChild(registro);
    linha.appendChild(telefone);
    linha.appendChild(email);
    linha.appendChild(unidade);
    linha.appendChild(especialidade);
    linha.appendChild(opcoes);
    tabela.appendChild(linha);

    atualizar();
    alert("Profissional adicionado!"); //Mostra a mensagem que o profissional foi cadastrado

    formulario.classList.add('esconder');
    mostrar.classList.remove('esconder');

}



function excluirLinha() {
    let botoesExcluir = document.querySelectorAll('a.botao_vermelho');
    for (let botao of botoesExcluir) {
        botao.addEventListener('click', () => {

            botao.parentElement.parentElement.remove();

        });
    }


}

// editar formulario

let profissionaisEditar = [];
let idEditar = null;

function editarLinha() {
    let botoesEditar = document.querySelectorAll('a.botao_verde');
    botoesEditar.forEach(botao => {
        botao.addEventListener('click', e => {
            e.preventDefault();

            const tr = botao.closest('tr');
            if(!tr) return;

            const id = Number(tr.dataset.id);

            const profiss = profissionaisEditar.find(p => p.id === id);
            if(!profiss) return;

            document.getElementById('edit-id').value = profiss.id;
            document.getElementById('edit-nome').value = profiss.nome;
            document.getElementById('edit-registro').value = profiss.registro;
            document.getElementById('edit-telefone').value = profiss.telefone;
            document.getElementById('edit-email').value = profiss.email;
            document.getElementById('edit-unidade').value = profiss.unidade;
            document.getElementById('edit-especialidades').value = profiss.especialidade;
            document.getElementById('edit-opcoes').value = profiss.opcoes;

            idEditar = id;
            document.getElementById(formEditar).style.display = 'block';
        });

        
    });


}

// Esconde e mostra o botao de adicionar profissionais

const mostrar = document.getElementById('botaoAdd')
const formulario = document.getElementById('formProf');

mostrar.addEventListener('click', () => {
    mostrar.classList.add('esconder');
    formulario.classList.remove('esconder');
    formulario.reset();
});



// Função para atualizar o ID
// function atualizar(){
//     const tabela = document.getElementById('Prof');
//     const contador = document.getElementById('quantProfissionais');
//     const linhas = tabela.getElementsByTagName('tr').length;

//     contador.textContent = `Quantidade de Profissionais: ${linhas}`;

// }

// Funcionslidade do botão cancelar
const cancele = document.getElementById('cancele');
cancele.addEventListener('click', () => {
    formulario.classList.add('esconder');
    mostrar.classList.remove('esconder');
});