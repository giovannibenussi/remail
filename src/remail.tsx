import * as React from "react";
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
  return function RemailFactory(MyComponent: React.ComponentType) {
    class RemailEmail extends React.Component<
      React.ComponentProps<typeof MyComponent>
    > {
      static async send(props: InternalSendEmailProps) {
        return config.send({ ...props, Component: MyComponent });
      }

      render() {
        return <MyComponent {...this.props} />;
      }
    }

    return RemailEmail;
  };
}
