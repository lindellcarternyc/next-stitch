export const signin = async (formData: FormData) => {
  "use server";
  const username = formData.get("username");
  const password = formData.get("password");

  console.log({ username, password });
};
