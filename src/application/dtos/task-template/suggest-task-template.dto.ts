export interface ISuggestTaskTemplateDTO {
  readonly accountId: string;
  readonly playerId: string;
  readonly familyId: string;
  readonly title: string;
  readonly description?: string | null;
  readonly timeLimit?: string | null;
}
