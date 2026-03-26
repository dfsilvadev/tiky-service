import { SuggestTaskTemplateUseCase } from "../../application/use-cases/task-template/suggest-task-template.use-case";

import { makeTaskTemplateRepository } from "./make-task-template.repository";

export function makeSuggestTaskTemplateUseCase() {
  const taskTemplateRepository = makeTaskTemplateRepository();
  return new SuggestTaskTemplateUseCase(taskTemplateRepository);
}
