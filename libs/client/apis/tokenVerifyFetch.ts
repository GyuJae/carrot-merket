interface IEnterForm {
  payload: string;
}

export const tokenVerifyFetch = (data: IEnterForm) =>
  fetch("/api/users/tokenVerify", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
