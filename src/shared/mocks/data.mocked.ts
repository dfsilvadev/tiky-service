import { Role } from "../../generated/prisma/enums";

const mockedHashedPassword = "mocked-hash";

const testPassword = "my-secure-password";

const mockedUser = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: testPassword,
  role: Role.PLAYER
};

export { mockedHashedPassword, mockedUser, testPassword };
