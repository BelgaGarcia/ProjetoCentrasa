import { useState } from "react";

const categoryOptions = [
  {
    value: "desktop",
    label: "Desktop / Notebook / Workstation (Suporte)",
    subcategories: [
      "Desktop não liga",
      "Desktop sem rede",
      "“Software” está travando",
      "Sem acesso a site",
      "Email malicioso",
      "Site Centrasa",
      "Redefinição de senha",
      "Usuário bloqueado",
      "Não consigo abrir PDF",
      "Instalação de software",
      "Criação de usuário",
      "Compartilhamento",
      "Computador travando",
      "Configuração de navegador",
      "SIGEM",
      "Erro OBBPlus",
      "Erro Outlook",
      "Erro DANFEView",
      "Recuperação de arquivo",
      "Recebimento de email",
      "Sem acesso a rede",
      "Troca de periférico",
      "Tela piscando",
    ],
  },
  {
    value: "impressora",
    label: "Impressora",
    subcategories: [
      "Impressora não liga",
      "Impressora offline",
      "Encravamento de papel",
      "Reposição de tinta",
      "Marcas / manchas nas impressões",
      "Impressões parciais",
      "Impressora não imprime",
      "Acesso a impressora",
      "Instalação de scanner / impressora",
      "Impressora com novo IP",
      "Impressora travou",
      "Troca de toner",
    ],
  },
  {
    value: "switch",
    label: "Switch",
    subcategories: ["Switch apagado", "Movimentação de switch"],
  },
  {
    value: "nobreak",
    label: "Nobreak",
    subcategories: ["Nobreak apitando", "Nobreak desligou", "Nobreak não liga"],
  },
  {
    value: "monitor",
    label: "Monitor",
    subcategories: ["Suporte quebrado", "Cabo arrebentado ou solto"],
  },
  {
    value: "headset",
    label: "Headset",
    subcategories: ["Solicito headset emprestado"],
  },
];

function App() {
  const [requesterEmail, setRequesterEmail] = useState("");
  const [computerId, setComputerId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [userName, setUserName] = useState("");
  const [problemType, setProblemType] = useState("informatica");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      requesterEmail,
      computerId,
      employeeId,
      userName,
      problemType,
      summary,
      description,
      category,
      subcategory,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-10 px-6 shadow-md">
        <h1 className="text-3xl md:text-4xl font-semibold text-center">
          Bem-vindo à Central de Chamados da Informática
        </h1>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Registre seu chamado com a informática
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Informe seu e-mail corporativo, descreva rapidamente o problema no campo{" "}
              <strong>Summary</strong>, forneça detalhes completos no campo{" "}
              <strong>Description</strong>, inclua dados de usuário/máquina e relate passos já
              realizados. Quanto mais completo o chamado, mais rápido conseguimos ajudar.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="requesterEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail corporativo (obrigatório)
                </label>
                <input
                  id="requesterEmail"
                  type="email"
                  required
                  value={requesterEmail}
                  onChange={(event) => setRequesterEmail(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="nome.sobrenome@empresa.com"
                />
              </div>

              <div>
                <label htmlFor="computerId" className="block text-sm font-medium text-gray-700 mb-2">
                  Identificação do computador (obrigatório)
                </label>
                <input
                  id="computerId"
                  type="text"
                  required
                  value={computerId}
                  onChange={(event) => setComputerId(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="Hostname, patrimônio ou inventário"
                />
              </div>

              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
                  Matrícula (obrigatório)
                </label>
                <input
                  id="employeeId"
                  type="text"
                  required
                  value={employeeId}
                  onChange={(event) => setEmployeeId(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="Ex.: 123456"
                />
              </div>

              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo do usuário (obrigatório)
                </label>
                <input
                  id="userName"
                  type="text"
                  required
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="Nome e sobrenome"
                />
              </div>
            </div>

            <div>
              <label htmlFor="problemType" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de problema (obrigatório)
              </label>
              <select
                id="problemType"
                required
                value={problemType}
                onChange={(event) => setProblemType(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              >
                <option value="informatica">Informática</option>
                <option value="infraestrutura">Infraestrutura</option>
              </select>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria principal (obrigatório)
                </label>
                <select
                  id="category"
                  required
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setSubcategory("");
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                >
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {category && (
                <div>
                  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategoria do problema (obrigatório)
                  </label>
                  <select
                    id="subcategory"
                    required
                    value={subcategory}
                    onChange={(event) => setSubcategory(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  >
                    <option value="" disabled>
                      Escolha a subcategoria específica
                    </option>
                    {categoryOptions
                      .find((option) => option.value === category)
                      ?.subcategories.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                Summary (required)
              </label>
              <input
                id="summary"
                type="text"
                required
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Breve resumo do problema..."
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (required)
              </label>
              <textarea
                id="description"
                required
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                rows="5"
                placeholder="Detalhe completamente o chamado, incluindo erros, telas e passos reproduzidos..."
              />
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">Attach a file (opcional)</span>
              <label
                htmlFor="attachment"
                className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 text-gray-500 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition"
              >
                Clique para anexar um arquivo
                <input id="attachment" type="file" className="hidden" />
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
