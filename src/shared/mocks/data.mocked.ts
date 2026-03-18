import { Role } from "../../generated/prisma/enums";

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

export { DUMMY_ACCOUNT, DUMMY_CREDENTIALS, DUMMY_HASH, DUMMY_PASS_VALUE };
