import * as React from "react";
import { Resend } from "resend";
import type { SendEmailProps } from "./remail.js";

export function resendConfig({ api_key }: { api_key: string }) {
  return {
    send: async function sendResendEmail({
      Component,
      from,
      to,
      subject,
    }: SendEmailProps) {
      const resend = new Resend(api_key);
      await resend.emails.send({
        // TODO: Update this to use the correct from address
        from: from || "onboarding@resend.dev",
        to,
        subject,
        react: <Component />,
      });
    },
  };
}
