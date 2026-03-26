import { SuggestTaskTemplateController } from "../http/controllers/task-template/suggest-task-template.controller";

import { makeSuggestTaskTemplateUseCase } from "../../infrastructure/factories/make-suggest-task-template.use-case";

export function makeSuggestTaskTemplateController() {
  const suggestTaskTemplateUseCase = makeSuggestTaskTemplateUseCase();
  return new SuggestTaskTemplateController(suggestTaskTemplateUseCase);
}
