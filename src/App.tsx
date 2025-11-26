import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryOptions, ticketSchema, TicketFormValues } from "./ticketSchema";

const defaultValues: TicketFormValues = {
  requesterEmail: "",
  computerId: "",
  employeeId: "",
  userName: "",
  isForRequester: "",
  assistedEmail: "",
  assistedComputerId: "",
  assistedEmployeeId: "",
  assistedUserName: "",
  problemType: "",
  category: "",
  subcategory: "",
  equipmentTag: "",
  summary: "",
  description: ""
};

function App() {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isSubmitting }
  } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues
  });

  const requesterEmail = watch("requesterEmail");
  const computerId = watch("computerId");
  const employeeId = watch("employeeId");
  const userName = watch("userName");
  const isForRequester = watch("isForRequester");
  const assistedEmail = watch("assistedEmail");
  const assistedComputerId = watch("assistedComputerId");
  const assistedEmployeeId = watch("assistedEmployeeId");
  const assistedUserName = watch("assistedUserName");
  const problemType = watch("problemType");
  const category = watch("category");
  const subcategory = watch("subcategory");
  const equipmentTag = watch("equipmentTag");
  const summary = watch("summary");

  const shouldCollectAssistedData = isForRequester === "nao";
  const requiresEquipmentTag = category === "desktop" || category === "impressora";

  const isComputerIdDisabled = !requesterEmail;
  const isEmployeeIdDisabled = !computerId;
  const isUserNameDisabled = !employeeId;
  const isRecipientTypeDisabled = !userName;
  const isAssistedEmailDisabled = !shouldCollectAssistedData;
  const isAssistedComputerIdDisabled = !shouldCollectAssistedData || !assistedEmail;
  const isAssistedEmployeeIdDisabled = !shouldCollectAssistedData || !assistedComputerId;
  const isAssistedUserNameDisabled = !shouldCollectAssistedData || !assistedEmployeeId;
  const isProblemTypeDisabled =
    !userName || !isForRequester || (shouldCollectAssistedData && !assistedUserName);
  const isCategoryDisabled = !problemType;
  const isSubcategoryDisabled = !category;
  const isEquipmentTagDisabled = requiresEquipmentTag ? !subcategory : false;
  const isSummaryDisabled = requiresEquipmentTag ? !equipmentTag : !subcategory;
  const isDescriptionDisabled = !summary;

  const prevRequesterEmail = useRef(requesterEmail);
  const prevComputerId = useRef(computerId);
  const prevEmployeeId = useRef(employeeId);
  const prevUserName = useRef(userName);
  const prevIsForRequester = useRef(isForRequester);
  const prevAssistedEmail = useRef(assistedEmail);
  const prevAssistedComputerId = useRef(assistedComputerId);
  const prevAssistedEmployeeId = useRef(assistedEmployeeId);
  const prevAssistedUserName = useRef(assistedUserName);
  const prevProblemType = useRef(problemType);
  const prevCategory = useRef(category);
  const prevSubcategory = useRef(subcategory);
  const prevEquipmentTag = useRef(equipmentTag);
  const prevSummary = useRef(summary);

  useEffect(() => {
    if (prevRequesterEmail.current !== requesterEmail) {
      resetField("computerId");
      resetField("employeeId");
      resetField("userName");
      resetField("isForRequester");
      resetField("assistedEmail");
      resetField("assistedComputerId");
      resetField("assistedEmployeeId");
      resetField("assistedUserName");
      resetField("problemType");
      resetField("category");
      resetField("subcategory");
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevRequesterEmail.current = requesterEmail;
    }
  }, [requesterEmail, resetField]);

  useEffect(() => {
    if (prevComputerId.current !== computerId) {
      resetField("employeeId");
      resetField("userName");
      resetField("isForRequester");
      resetField("assistedEmail");
      resetField("assistedComputerId");
      resetField("assistedEmployeeId");
      resetField("assistedUserName");
      resetField("problemType");
      resetField("category");
      resetField("subcategory");
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevComputerId.current = computerId;
    }
  }, [computerId, resetField]);

  useEffect(() => {
    if (prevEmployeeId.current !== employeeId) {
      resetField("userName");
      resetField("isForRequester");
      resetField("assistedEmail");
      resetField("assistedComputerId");
      resetField("assistedEmployeeId");
      resetField("assistedUserName");
      resetField("problemType");
      resetField("category");
      resetField("subcategory");
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevEmployeeId.current = employeeId;
    }
  }, [employeeId, resetField]);

  useEffect(() => {
    if (prevUserName.current !== userName) {
      resetField("isForRequester");
      resetField("assistedEmail");
      resetField("assistedComputerId");
      resetField("assistedEmployeeId");
      resetField("assistedUserName");
      resetField("problemType");
      resetField("category");
      resetField("subcategory");
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevUserName.current = userName;
    }
  }, [userName, resetField]);

  useEffect(() => {
    if (prevIsForRequester.current !== isForRequester) {
      resetField("assistedEmail");
      resetField("assistedComputerId");
      resetField("assistedEmployeeId");
      resetField("assistedUserName");
      resetField("problemType");
      resetField("category");
      resetField("subcategory");
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevIsForRequester.current = isForRequester;
    }
  }, [isForRequester, resetField]);

  useEffect(() => {
    if (prevAssistedEmail.current !== assistedEmail) {
      resetField("assistedComputerId");
      resetField("assistedEmployeeId");
      resetField("assistedUserName");
      resetField("problemType");
      resetField("category");
      resetField("subcategory");
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevAssistedEmail.current = assistedEmail;
    }
  }, [assistedEmail, resetField]);

  useEffect(() => {
    if (prevAssistedComputerId.current !== assistedComputerId) {
      resetField("assistedEmployeeId");
      resetField("assistedUserName");
      resetField("problemType");
      resetField("category");
      resetField("subcategory");
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevAssistedComputerId.current = assistedComputerId;
    }
  }, [assistedComputerId, resetField]);

  useEffect(() => {
    if (prevAssistedEmployeeId.current !== assistedEmployeeId) {
      resetField("assistedUserName");
      resetField("problemType");
      resetField("category");
      resetField("subcategory");
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevAssistedEmployeeId.current = assistedEmployeeId;
    }
  }, [assistedEmployeeId, resetField]);

  useEffect(() => {
    if (prevAssistedUserName.current !== assistedUserName) {
      resetField("problemType");
      resetField("category");
      resetField("subcategory");
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevAssistedUserName.current = assistedUserName;
    }
  }, [assistedUserName, resetField]);

  useEffect(() => {
    if (prevProblemType.current !== problemType) {
      resetField("category");
      resetField("subcategory");
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevProblemType.current = problemType;
    }
  }, [problemType, resetField]);

  useEffect(() => {
    if (prevCategory.current !== category) {
      resetField("subcategory");
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevCategory.current = category;
    }
  }, [category, resetField]);

  useEffect(() => {
    if (prevSubcategory.current !== subcategory) {
      resetField("equipmentTag");
      resetField("summary");
      resetField("description");
      prevSubcategory.current = subcategory;
    }
  }, [subcategory, resetField]);

  useEffect(() => {
    if (prevEquipmentTag.current !== equipmentTag) {
      resetField("summary");
      resetField("description");
      prevEquipmentTag.current = equipmentTag;
    }
  }, [equipmentTag, resetField]);

  useEffect(() => {
    if (prevSummary.current !== summary) {
      resetField("description");
      prevSummary.current = summary;
    }
  }, [summary, resetField]);

  const onSubmit = async (data: TicketFormValues) => {
    try {
      await fetch("/api/send-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error("Falha ao enviar o chamado", error);
    }
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

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="requesterEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail corporativo (obrigatório)
                </label>
                <input
                  id="requesterEmail"
                  type="email"
                  {...register("requesterEmail")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="nome.sobrenome@empresa.com"
                />
                {errors.requesterEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.requesterEmail.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="computerId" className="block text-sm font-medium text-gray-700 mb-2">
                  Identificação do computador (obrigatório)
                </label>
                <input
                  id="computerId"
                  type="text"
                  {...register("computerId")}
                  disabled={isComputerIdDisabled}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
                  placeholder="Hostname, patrimônio ou inventário"
                />
                {errors.computerId && (
                  <p className="mt-1 text-sm text-red-600">{errors.computerId.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
                  Matrícula (obrigatório)
                </label>
                <input
                  id="employeeId"
                  type="text"
                  {...register("employeeId")}
                  disabled={isEmployeeIdDisabled}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
                  placeholder="Ex.: 123456"
                />
                {errors.employeeId && (
                  <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo do usuário (obrigatório)
                </label>
                <input
                  id="userName"
                  type="text"
                  {...register("userName")}
                  disabled={isUserNameDisabled}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
                  placeholder="Nome e sobrenome"
                />
                {errors.userName && (
                  <p className="mt-1 text-sm text-red-600">{errors.userName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="recipientType" className="block text-sm font-medium text-gray-700 mb-2">
                O chamado é para o solicitante? (obrigatorio)
              </label>
              <select
                id="recipientType"
                {...register("isForRequester")}
                disabled={isRecipientTypeDisabled}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
              >
                <option value="" disabled>
                  Selecione uma opcao
                </option>
                <option value="sim">Sim</option>
                <option value="nao">Nao</option>
              </select>
              {errors.isForRequester && (
                <p className="mt-1 text-sm text-red-600">{errors.isForRequester.message}</p>
              )}
            </div>

            {shouldCollectAssistedData && (
              <div className="grid gap-6 md:grid-cols-2 items-start">
                <div>
                  <label htmlFor="assistedEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail do solicitado (obrigatorio)
                  </label>
                  <input
                    id="assistedEmail"
                    type="email"
                    {...register("assistedEmail")}
                    disabled={isAssistedEmailDisabled}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
                    placeholder="pessoa.solicitada@empresa.com"
                  />
                  {errors.assistedEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.assistedEmail.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="assistedComputerId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Identificacao do computador do solicitado
                  </label>
                  <input
                    id="assistedComputerId"
                    type="text"
                    {...register("assistedComputerId")}
                    disabled={isAssistedComputerIdDisabled}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
                    placeholder="Ex.: PC-1234"
                  />
                  {errors.assistedComputerId && (
                    <p className="mt-1 text-sm text-red-600">{errors.assistedComputerId.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="assistedEmployeeId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Matricula do solicitado (obrigatorio)
                  </label>
                  <input
                    id="assistedEmployeeId"
                    type="text"
                    {...register("assistedEmployeeId")}
                    disabled={isAssistedEmployeeIdDisabled}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
                    placeholder="000000"
                  />
                  {errors.assistedEmployeeId && (
                    <p className="mt-1 text-sm text-red-600">{errors.assistedEmployeeId.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="assistedUserName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nome completo do solicitado (obrigatorio)
                  </label>
                  <input
                    id="assistedUserName"
                    type="text"
                    {...register("assistedUserName")}
                    disabled={isAssistedUserNameDisabled}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
                    placeholder="Nome e sobrenome"
                  />
                  {errors.assistedUserName && (
                    <p className="mt-1 text-sm text-red-600">{errors.assistedUserName.message}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="problemType" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de problema (obrigatório)
              </label>
              <select
                id="problemType"
                {...register("problemType")}
                disabled={isProblemTypeDisabled}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
              >
                <option value="" disabled>
                  Selecione o tipo de problema
                </option>
                <option value="informatica">Informática</option>
                <option value="infraestrutura">Infraestrutura</option>
              </select>
              {errors.problemType && (
                <p className="mt-1 text-sm text-red-600">{errors.problemType.message}</p>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria principal (obrigatório)
                </label>
                <select
                  id="category"
                  {...register("category")}
                  disabled={isCategoryDisabled}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
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
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              {category && (
                <div>
                  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategoria do problema (obrigatório)
                  </label>
                  <select
                    id="subcategory"
                    {...register("subcategory")}
                    disabled={isSubcategoryDisabled}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
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
                  {errors.subcategory && (
                    <p className="mt-1 text-sm text-red-600">{errors.subcategory.message}</p>
                  )}
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
                    {...register("equipmentTag")}
                    disabled={isEquipmentTagDisabled}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
                    placeholder={
                      category === "desktop"
                        ? "Informe a Etiqueta do computador atendido"
                        : "Informe a Etiqueta da impressora atendida"
                    }
                  />
                  {errors.equipmentTag && (
                    <p className="mt-1 text-sm text-red-600">{errors.equipmentTag.message}</p>
                  )}
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
                {...register("summary")}
                disabled={isSummaryDisabled}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
                placeholder="Breve resumo do problema..."
              />
              {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição (obrigatório)
              </label>
              <textarea
                id="description"
                {...register("description")}
                disabled={isDescriptionDisabled}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100"
                rows={5}
                placeholder="Detalhe completamente o chamado, incluindo erros, telas e passos reproduzidos..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
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
              disabled={isSubmitting}
              className="inline-flex items-center justify-center bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition disabled:opacity-70"
            >
              {isSubmitting ? "Enviando..." : "Submit"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
