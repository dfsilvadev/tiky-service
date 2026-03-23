import { ECONOMY_RULES } from "../../domain/constants/economy.constants";

import { type Weight } from "../../generated/prisma/client";

export function getXpByWeight(weight: Weight): number {
  return ECONOMY_RULES.TASK_WEIGHT_XP[weight];
}
