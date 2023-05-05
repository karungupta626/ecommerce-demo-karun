export interface User {
  id: number;
  username: string;
  password: string;
}

export async function createUser(user: User): Promise<User> {
  const response = await fetch(
    "https://642ec45a8ca0fe3352d85666.mockapi.io/userdetails",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }
  );
  const data = await response.json();
  return data;
}
