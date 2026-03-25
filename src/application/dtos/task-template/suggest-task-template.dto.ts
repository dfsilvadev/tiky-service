export interface ISuggestTaskTemplateDTO {
  readonly accountId: string;
  readonly familyId: string;
  readonly title: string;
  readonly description?: string | undefined;
  readonly timeLimit?: string | null;
}
