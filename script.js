// Obtém os elementos do DOM pelos seus IDs
const caixaInput = document.getElementById("caixa-input");
const listaContainer = document.getElementById("lista-container");
const popup = document.getElementById("popup");

// Adiciona um evento de input ao campo de texto
caixaInput.addEventListener("input", () => {
  // Salva o valor atual do input na sessão
  sessionStorage.setItem("entradaAtual", caixaInput.value);
});

// Função para mostrar um popup com uma mensagem
function mostrarPopup(mensagem) {
  popup.textContent = mensagem; // Define o texto do popup
  popup.classList.add("mostrar"); // Adiciona a classe para mostrar o popup
  setTimeout(() => {
    popup.classList.remove("mostrar"); // Remove a classe após 3 segundos
  }, 3000);
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
  const valorTruncado = caixaInput.value.trim(); // Remove espaços em branco do início e fim do valor
  if (valorTruncado === "") {
    mostrarPopup("Você deve escrever algo!"); // Mostra popup se o campo estiver vazio
  } else {
    const li = document.createElement("li"); // Cria um novo elemento de lista
    li.textContent = valorTruncado; // Define o texto da lista

    const botaoDeletar = document.createElement("span"); // Cria um botão para deletar a tarefa
    botaoDeletar.textContent = "×"; // Define o texto do botão de deletar
    li.appendChild(botaoDeletar); // Adiciona o botão ao item da lista

    listaContainer.appendChild(li); // Adiciona o item de lista ao container
    caixaInput.value = ""; // Limpa o campo de texto
    sessionStorage.removeItem("entradaAtual"); // Remove o valor do input da sessão
    salvarDados(); // Salva os dados no localStorage
  }
}

// Adiciona um evento de clique à lista de tarefas
listaContainer.addEventListener("click", function (e) {
  const elemento = e.target; // Obtém o elemento que foi clicado
  if (elemento.tagName === "LI") {
    elemento.classList.toggle("marcado"); // Marca ou desmarca a tarefa
    salvarDados(); // Salva os dados no localStorage
  } else if (elemento.tagName === "SPAN") {
    elemento.parentElement.remove(); // Remove a tarefa
    salvarDados(); // Salva os dados no localStorage
  }
});

// Função para salvar os dados no localStorage
function salvarDados() {
  localStorage.setItem("tarefas", listaContainer.innerHTML); // Salva o conteúdo da lista no localStorage
}

// Função para mostrar as tarefas ao carregar a página
function mostrarTarefa() {
  listaContainer.innerHTML = localStorage.getItem("tarefas") || ""; // Carrega as tarefas do localStorage
  caixaInput.value = sessionStorage.getItem("entradaAtual") || ""; // Carrega o valor do input da sessão
}

mostrarTarefa(); // Chama a função para mostrar as tarefas ao carregar a página
