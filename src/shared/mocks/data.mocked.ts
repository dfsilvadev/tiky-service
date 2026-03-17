import { Role } from "../../generated/prisma/enums";

const mockHashedPassword = "mocked-hash";
const mockPassword = "my-secure-password";

const mockAccount = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: mockPassword,
  role: Role.PLAYER
};

export { mockAccount, mockHashedPassword, mockPassword };
