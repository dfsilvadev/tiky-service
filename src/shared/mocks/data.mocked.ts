import { Role } from "../../generated/prisma/enums";

const DUMMY_PASSWORD = "dummy-value";
const DUMMY_HASH = "dummy-hash";

const DUMMY_ACCOUNT = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: DUMMY_PASSWORD,
  role: Role.PLAYER
};

export { DUMMY_ACCOUNT, DUMMY_HASH, DUMMY_PASSWORD };
