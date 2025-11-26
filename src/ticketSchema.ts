import { z } from "zod";

export type CategoryOption = {
  value: string;
  label: string;
  subcategories: string[];
};

export const categoryOptions: CategoryOption[] = [
  {
    value: "desktop",
    label: "Desktop / Notebook / Workstation (Suporte)",
    subcategories: [
      "Desktop nao liga",
      "Desktop sem rede",
      "Software esta travando",
      "Sem acesso a site",
      "Email malicioso",
      "Site Centrasa",
      "Redefinicao de senha",
      "Usuario bloqueado",
      "Nao consigo abrir PDF",
      "Instalacao de software",
      "Criacao de usuario",
      "Compartilhamento",
      "Computador travando",
      "Configuracao de navegador",
      "SIGEM",
      "Erro OBBPlus",
      "Erro Outlook",
      "Erro DANFEView",
      "Recuperacao de arquivo",
      "Recebimento de email",
      "Sem acesso a rede",
      "Troca de periferico",
      "Tela piscando"
    ]
  },
  {
    value: "impressora",
    label: "Impressora",
    subcategories: [
      "Impressora nao liga",
      "Impressora offline",
      "Encravamento de papel",
      "Reposicao de tinta",
      "Marcas / manchas nas impressoes",
      "Impressao parcial",
      "Impressora nao imprime",
      "Acesso a impressora",
      "Instalacao de scanner / impressora",
      "Impressora com novo IP",
      "Impressora travou",
      "Troca de toner"
    ]
  },
  {
    value: "switch",
    label: "Switch",
    subcategories: ["Switch apagado", "Movimentacao de switch"]
  },
  {
    value: "nobreak",
    label: "Nobreak",
    subcategories: ["Nobreak apitando", "Nobreak desligou", "Nobreak nao liga"]
  },
  {
    value: "monitor",
    label: "Monitor",
    subcategories: ["Suporte quebrado", "Cabo arrebentado ou solto"]
  },
  {
    value: "headset",
    label: "Headset",
    subcategories: ["Solicito headset emprestado"]
  }
];

const categoryToSubcategories = categoryOptions.reduce<Record<string, string[]>>(
  (acc, option) => {
    acc[option.value] = option.subcategories;
    return acc;
  },
  {}
);

const assistedFieldMessage = "Campo obrigatorio quando o chamado nao e para o solicitante.";

export const ticketSchema = z
  .object({
    requesterEmail: z.string().email("E-mail invalido"),
    computerId: z.string().min(1, "Identificacao obrigatoria"),
    employeeId: z.string().min(1, "Matricula obrigatoria"),
    userName: z.string().min(1, "Nome obrigatorio"),
    isForRequester: z
      .union([z.enum(["sim", "nao"]), z.literal("")])
      .refine((val) => val === "sim" || val === "nao", {
        message: "Informe se o chamado e para o solicitante."
      }),
    assistedEmail: z.string().email("E-mail invalido").optional().or(z.literal("")),
    assistedComputerId: z.string().optional().or(z.literal("")),
    assistedEmployeeId: z.string().optional().or(z.literal("")),
    assistedUserName: z.string().optional().or(z.literal("")),
    problemType: z
      .union([z.enum(["informatica", "infraestrutura"]), z.literal("")])
      .refine((val) => val === "informatica" || val === "infraestrutura", {
        message: "Selecione o tipo de problema."
      }),
    category: z.string().min(1, "Categoria obrigatoria"),
    subcategory: z.string().min(1, "Subcategoria obrigatoria"),
    equipmentTag: z.string().optional().or(z.literal("")),
    summary: z.string().min(1, "Resumo obrigatorio"),
    description: z.string().min(1, "Descricao obrigatoria")
  })
  .superRefine((data, ctx) => {
    if (data.isForRequester === "nao") {
      if (!data.assistedEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["assistedEmail"],
          message: assistedFieldMessage
        });
      }
      if (!data.assistedComputerId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["assistedComputerId"],
          message: assistedFieldMessage
        });
      }
      if (!data.assistedEmployeeId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["assistedEmployeeId"],
          message: assistedFieldMessage
        });
      }
      if (!data.assistedUserName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["assistedUserName"],
          message: assistedFieldMessage
        });
      }
    }

    if (["desktop", "impressora"].includes(data.category)) {
      if (!data.equipmentTag) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["equipmentTag"],
          message: "TAG e obrigatoria para Desktop ou Impressora."
        });
      }
    }

    const allowedSubcategories = categoryToSubcategories[data.category];
    if (allowedSubcategories && !allowedSubcategories.includes(data.subcategory)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["subcategory"],
        message: "Subcategoria invalida para a categoria selecionada."
      });
    }
  });

export type TicketFormValues = z.infer<typeof ticketSchema>;
