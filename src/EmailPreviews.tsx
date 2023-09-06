import * as React from "react";
import { Sidebar } from "./Sidebar.js";

export function EmailPreviews({
  emails,
}: {
  emails: any[];
}) {
  return <Sidebar emails={emails} />;
}
