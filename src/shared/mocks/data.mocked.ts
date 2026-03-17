import { Role } from "../../generated/prisma/enums";

const DUMMY_PASS_VALUE = "dummy-value";
const DUMMY_HASH = "dummy-hash";

const DUMMY_ACCOUNT = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: DUMMY_PASS_VALUE,
  role: Role.PLAYER
};

export { DUMMY_ACCOUNT, DUMMY_HASH, DUMMY_PASS_VALUE };
