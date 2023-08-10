import React from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import SidebarUI from "./NewSidebarUI";
import { useSearchParam } from "./useSearchParam";

type EmailData = {
  title: string;
  cases: Array<{ description: string; email: React.ReactNode }>;
};

function EmailPreview({ emails }: { emails: EmailData[] }):
  | {
      title: string;
      description: string;
      preview: React.ReactNode;
    }
  | undefined {
  const componentName = useSearchParam("componentName");
  const description = useSearchParam("description");

  const currentEmail = emails?.find?.((email) => email.title === componentName);
  if (!currentEmail) {
    return undefined;
  }
  const currentCases = currentEmail?.cases || [];
  const currentCase =
    currentCases.find((email) => email.description === description) ||
    currentCases?.[0] ||
    null;

  if (!currentCase) {
    return undefined;
  }

  const selectedEmailData = {
    title: currentEmail.title,
    description: currentCase?.description,
    preview: <>{currentCase?.email}</>,
  };

  return selectedEmailData;
}

export default function Example({ emails }: { emails: EmailData[] }) {
  const componentName = useSearchParam("componentName");
  const description = useSearchParam("description");
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
  const selectedEmailData = EmailPreview({ emails });

  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 3fr)",
      }}
    >
      <SidebarUI navigation={emailData} />
      {selectedEmailData && (
        <div
          style={{
            padding: "1rem",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {selectedEmailData?.title} - {selectedEmailData?.description}
          </h1>
          {selectedEmailData?.preview}
        </div>
      )}
    </div>
  );
}
