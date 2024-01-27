import { hash } from "bcryptjs";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

test("hashPassword", async () => {
  const password = "1234";
  const hashedPassword = await hashPassword(password);
  console.log("hashedPassword", hashedPassword);

  expect(hashedPassword).not.toBe(password);
});
