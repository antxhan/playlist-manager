import { useEffect } from "react";
import Layout from "../../Layout";
import { auth } from "../auth";

export default function Callback() {
  // to prevent side effects, call the authenticate function in a useEffect hook
  useEffect(() => {
    auth.authenticate();
  }, []);

  return (
    <Layout>
      <div>Authenticating...</div>
    </Layout>
  );
}
