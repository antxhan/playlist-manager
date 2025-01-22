import Layout from "../../Layout";
import { auth } from "../auth";

export default function Callback() {
  auth.authenticate();
  return (
    <Layout>
      <div>Authenticating...</div>
    </Layout>
  );
}
