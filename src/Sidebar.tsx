import React from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import SidebarUI from "./NewSidebarUI";
import { useSearchParam } from "./useSearchParam";

type EmailData = {
  title: string;
  cases: Array<{ description: string; email: React.ReactNode }>;
};

function EmailPreview({
  componentName,
  description,
  emails,
}: {
  emails: EmailData[];
  componentName: string | null;
  description: string | null;
}) {
  console.log("componentName:", componentName);
  console.log("description:", description);

  const currentEmail = emails?.find?.((email) => email.title === componentName);
  if (!currentEmail) {
    return null;
  }
  const currentCases = currentEmail?.cases || [];
  const currentCase =
    currentCases.find((email) => email.description === description) ||
    currentCases?.[0] ||
    null;

  if (!currentCase?.email) {
    return null;
  }

  //const selectedEmailData = {
  //title: currentEmail.title,
  //description: currentCase?.description,
  //preview: <>{currentCase?.email}</>,
  //};

  //<h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
  //{selectedEmailData?.title} - {selectedEmailData?.description}
  //</h1>

  return <>{currentCase?.email}</>;
}

export function Sidebar({ emails }: { emails: EmailData[] }) {
  const componentName = useSearchParam("componentName");
  const description = useSearchParam("description");
  const hello = useSearchParam("hello");
  console.log("componentName:", componentName)
  const emailData =
    emails?.map?.((email) => ({
      name: email.title,
      icon: DocumentDuplicateIcon,
      href: "?componentName=" + email.title,
      current: email.title === componentName,
      subItems: email.cases?.map?.((emailCase) => ({
        name: emailCase.description,
        current:
          emailCase.description === description &&
          email.title === componentName,
        href:
          "?componentName=" +
          email.title +
          "&description=" +
          emailCase.description,
      })),
    })) || [];

  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 3fr)",
      }}
    >
      <SidebarUI navigation={emailData} />
      <div
        style={{
          padding: "1rem",
        }}
      >
        <EmailPreview
          {...{
            componentName,
            description,
            emails,
          }}
        />
      </div>
    </div>
  );
}
