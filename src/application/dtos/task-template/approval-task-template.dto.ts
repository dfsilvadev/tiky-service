import { Weight } from "../../../generated/prisma/client";

export interface IApprovalTaskTemplateDTO {
  readonly templateId: string;
  readonly familyId: string;
  readonly weight: Weight;
}
