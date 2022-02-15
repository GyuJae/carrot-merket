interface IEnterForm {
  email?: string;
  phone?: number;
}

export const enterFetch = (data: IEnterForm) =>
  fetch("/api/users/enter", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
