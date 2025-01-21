import { auth } from "../auth";

export default function Callback() {
  auth.getAuthCode();
  return <div>Authenticating...</div>;
}
