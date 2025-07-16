import { assertPermissions } from "../../nextauth/auth";

import { HomePage } from "./_content";

export default async function Dashboard() {
  await assertPermissions(["homepage:read"]);
  return <HomePage />;
}
