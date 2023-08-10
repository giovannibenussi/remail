import * as React from "react";
import Sidebar from "./Sidebar.js";
import "./styles.css";

type InternalSendEmailProps = {
  from?: string;
  to: string;
  subject: string;
};

export type SendEmailProps = {
  Component: React.ComponentType;
} & InternalSendEmailProps;

type RemailConstructor = {
  send: (options: SendEmailProps) => Promise<void>;
};

export function Remail(config: RemailConstructor) {
  return function RemailFactory(Component: React.ComponentType) {
    class RemailEmail extends React.Component<
      React.ComponentProps<typeof Component>
    > {
      static async send(props: InternalSendEmailProps) {
        return config.send({ ...props, Component });
      }

      render() {
        return <Component {...this.props} />;
      }
    }

    return RemailEmail;
  };
}

export function EmailPreviews({
  enableOnProduction,
  emails,
}: {
  enableOnProduction?: boolean;
  emails: any[];
}) {
  if (process.env.NODE_ENV === "production" && !enableOnProduction) {
    throw new Error(
      "Remail: Email previews are allowed only on development by default. Override setting this by adding the enableOnProduction prop in the EmailPreviews component."
    );
  }
  return <Sidebar emails={emails} />;
}
