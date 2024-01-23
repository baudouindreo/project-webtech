export default function handler(req, res) {
  const user = {
    username: "anonymous",
  };

  res.status(200).json(user);
}