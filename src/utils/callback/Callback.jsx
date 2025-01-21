import { auth } from "../auth";

export default function Callback() {
  auth.authenticate();
  return <div>Authenticating...</div>;
}
