import { Weight } from "../../generated/prisma/client";

export const ECONOMY_RULES = {
  XP_PER_BRL: 100,
  TASK_WEIGHT_XP: {
    BASIC: 10,
    IMPORTANT: 50,
    EPIC: 100
  } as Record<Weight, number>
};
