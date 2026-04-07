import {
  RecurrenceType,
  Role,
  TemplateStatus,
  Weight
} from "../../generated/prisma/client";

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
  playerId: "149488b6-e946-4d00-b6e7-5c7c5a6b51bc",
  familyId: "dummy-family-id",
  recurrenceType: RecurrenceType.ONCE,
  isMandatory: true,
  timeLimit: "",
  subtasks: []
};

const DUMMY_TASK_TEMPLATE = {
  ...DUMMY_BODY_TASK_TEMPLATE,
  title: "Sample Task Template",
  description: "This is a sample task template for testing purposes.",
  weight: Weight.IMPORTANT,
  recurrencePattern: "",
  scheduledFor: new Date()
};

const DUMMY_SUGGESTED_TASK_TEMPLATE = {
  ...DUMMY_BODY_TASK_TEMPLATE,
  title: "Sample Suggested Task Template",
  description: "This is a sample suggested task template for testing purposes.",
  weight: Weight.SUGGESTED,
  status: TemplateStatus.PENDING_APPROVAL
};

/**
 * These DUMMY_* constants represent sample data from task instances
 */

const DUMMY_TASK_INSTANCE = {
  templateId: "dummy-template-id",
  playerId: "dummy-player-id",
  date: new Date()
};

// Exporting all dummy data constants for use in tests and other parts of the application
export {
  DUMMY_ACCOUNT,
  DUMMY_CREDENTIALS,
  DUMMY_FAMILY,
  DUMMY_HASH,
  DUMMY_PASS_VALUE,
  DUMMY_SUGGESTED_TASK_TEMPLATE,
  DUMMY_TASK_INSTANCE,
  DUMMY_TASK_TEMPLATE
};
