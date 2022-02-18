export default function meFetch() {
  return fetch("/api/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
