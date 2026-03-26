import { RecurrenceType, Role, Weight } from "../../generated/prisma/client";

/**
 * This DUMMY_* constants represent sample data from accounts
 */

const DUMMY_PASS_VALUE = "dummy-value";
const DUMMY_HASH = "dummy-hash";

const DUMMY_CREDENTIALS = {
  email: "johndoe@email.com",
  password: DUMMY_PASS_VALUE
};

const DUMMY_ACCOUNT = {
  name: "John Doe",
  email: "johndoe@email.com",
  password: DUMMY_PASS_VALUE,
  role: Role.PLAYER,
  familyId: "dummy-family-id"
};

/**
 * This DUMMY_* constants represent sample data from families
 */

const DUMMY_FAMILY = {
  name: "Doe Family",
  description: "A family for the Doe clan"
};

/**
 * These DUMMY_* constants represent sample data from task templates
 */

const DUMMY_BODY_TASK_TEMPLATE = {
  accountId: "dummy-account-id",
  familyId: "dummy-family-id",
  timeLimit: "18:00"
};

const DUMMY_TASK_TEMPLATE = {
  ...DUMMY_BODY_TASK_TEMPLATE,
  title: "Sample Task Template",
  description: "This is a sample task template for testing purposes.",
  weight: Weight.IMPORTANT,
  recurrenceType: RecurrenceType.WEEKLY,
  isMandatory: true,
  recurrencePattern: "1,3,5", // Every Monday, Wednesday, and Friday
  scheduledFor: new Date(),
  subtasks: []
};

const DUMMY_SUGGESTED_TASK_TEMPLATE = {
  ...DUMMY_BODY_TASK_TEMPLATE,
  title: "Sample Suggested Task Template",
  description: "This is a sample suggested task template for testing purposes."
};

// Exporting all dummy data constants for use in tests and other parts of the application
export {
  DUMMY_ACCOUNT,
  DUMMY_CREDENTIALS,
  DUMMY_FAMILY,
  DUMMY_HASH,
  DUMMY_PASS_VALUE,
  DUMMY_SUGGESTED_TASK_TEMPLATE,
  DUMMY_TASK_TEMPLATE
};
