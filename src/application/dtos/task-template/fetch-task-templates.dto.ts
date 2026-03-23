import { TemplateStatus } from "../../../generated/prisma/enums";

export interface IFetchTaskTemplatesDTO {
  readonly page: number;
  readonly limit: number;
  readonly status?: TemplateStatus;
  readonly order: "asc" | "desc";
}
