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
  const [problemType, setProblemType] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [equipmentTag, setEquipmentTag] = useState("");

  const clearDependentFields = (field) => {
    switch (field) {
      case "requesterEmail":
        setComputerId("");
        clearDependentFields("computerId");
        break;
      case "computerId":
        setEmployeeId("");
        clearDependentFields("employeeId");
        break;
      case "employeeId":
        setUserName("");
        clearDependentFields("userName");
        break;
      case "userName":
        setProblemType("");
        clearDependentFields("problemType");
        break;
      case "problemType":
        setCategory("");
        clearDependentFields("category");
        break;
      case "category":
        setSubcategory("");
        clearDependentFields("subcategory");
        break;
      case "subcategory":
        setEquipmentTag("");
        clearDependentFields("equipmentTag");
        break;
      case "equipmentTag":
        setSummary("");
        clearDependentFields("summary");
        break;
      case "summary":
        setDescription("");
        break;
      default:
        break;
    }
  };

  const requiresEquipmentTag = category === "desktop" || category === "impressora";
  const isComputerIdDisabled = !requesterEmail;
  const isEmployeeIdDisabled = !computerId;
  const isUserNameDisabled = !employeeId;
  const isProblemTypeDisabled = !userName;
  const isCategoryDisabled = !problemType;
  const isSubcategoryDisabled = !category;
  const isEquipmentTagDisabled = requiresEquipmentTag ? !subcategory : false;
  const isSummaryDisabled = requiresEquipmentTag ? !equipmentTag : !subcategory;
  const isDescriptionDisabled = !summary;

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
      equipmentTag,
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
              <strong>Resumo</strong>, forneça detalhes completos no campo{" "}
              <strong>Descrição</strong>, inclua dados de usuário/máquina e relate passos já
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
                  onChange={(event) => {
                    const value = event.target.value;
                    setRequesterEmail(value);
                    if (!value) {
                      clearDependentFields("requesterEmail");
                    }
                  }}
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
                  onChange={(event) => {
                    const value = event.target.value;
                    setComputerId(value);
                    if (!value) {
                      clearDependentFields("computerId");
                    }
                  }}
                  disabled={isComputerIdDisabled}
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
                  onChange={(event) => {
                    const value = event.target.value;
                    setEmployeeId(value);
                    if (!value) {
                      clearDependentFields("employeeId");
                    }
                  }}
                  disabled={isEmployeeIdDisabled}
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
                  onChange={(event) => {
                    const value = event.target.value;
                    setUserName(value);
                    if (!value) {
                      clearDependentFields("userName");
                    }
                  }}
                  disabled={isUserNameDisabled}
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
                onChange={(event) => {
                  const value = event.target.value;
                  setProblemType(value);
                  if (value !== problemType) {
                    clearDependentFields("problemType");
                  }
                }}
                disabled={isProblemTypeDisabled}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              >
                <option value="" disabled>
                  Selecione o tipo de problema
                </option>
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
                    const value = event.target.value;
                    setCategory(value);
                    if (value !== category) {
                      clearDependentFields("category");
                    }
                  }}
                  disabled={isCategoryDisabled}
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
                    onChange={(event) => {
                      const value = event.target.value;
                      setSubcategory(value);
                      if (value !== subcategory) {
                        clearDependentFields("subcategory");
                      }
                    }}
                    disabled={isSubcategoryDisabled}
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
              {requiresEquipmentTag && (
                <div>
                  <label htmlFor="equipmentTag" className="block text-sm font-medium text-gray-700 mb-2">
                    {category === "desktop"
                      ? "TAG do computador do chamado (obrigatório)"
                      : "TAG da impressora do chamado (obrigatório)"}
                  </label>
                  <input
                    id="equipmentTag"
                    type="text"
                    required
                    value={equipmentTag}
                    onChange={(event) => {
                      const value = event.target.value;
                      setEquipmentTag(value);
                      if (!value) {
                        clearDependentFields("equipmentTag");
                      }
                    }}
                    disabled={isEquipmentTagDisabled}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder={
                      category === "desktop"
                        ? "Informe a TAG/hostname do computador atendido"
                        : "Informe a TAG/invent��rio da impressora atendida"
                    }
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                Resumo (obrigatório)
              </label>
              <input
                id="summary"
                type="text"
                required
                value={summary}
                onChange={(event) => {
                  const value = event.target.value;
                  setSummary(value);
                  if (!value) {
                    clearDependentFields("summary");
                  }
                }}
                disabled={isSummaryDisabled}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Breve resumo do problema..."
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição (obrigatório)
              </label>
              <textarea
                id="description"
                required
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                disabled={isDescriptionDisabled}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                rows="5"
                placeholder="Detalhe completamente o chamado, incluindo erros, telas e passos reproduzidos..."
              />
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">Anexe um arquivo (opicional)</span>
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
