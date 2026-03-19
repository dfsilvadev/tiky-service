import { Role } from "../../generated/prisma/enums";

/**
 * This file contains dummy data used across multiple test files to avoid repetition and maintain consistency.
 * It includes a dummy account, credentials, and hash values that can be imported and used in various test cases.
 */

const DUMMY_PASS_VALUE = "dummy-value";
const DUMMY_HASH = "dummy-hash";

const DUMMY_CREDENTIALS = {
  email: "johndoe@example.com",
  password: DUMMY_PASS_VALUE
};

const DUMMY_ACCOUNT = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: DUMMY_PASS_VALUE,
  role: Role.PLAYER,
  familyId: "dummy-family-id"
};

/**
 * DUMMY_FAMILY represents a sample family entity that can be used in tests related to family creation and management.
 */

const DUMMY_FAMILY = {
  name: "Doe Family",
  description: "A family for the Doe clan"
};

export {
  DUMMY_ACCOUNT,
  DUMMY_CREDENTIALS,
  DUMMY_FAMILY,
  DUMMY_HASH,
  DUMMY_PASS_VALUE
};
