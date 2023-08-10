import React from "react";
import {
  InboxStackIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { useSearchParam } from "./useSearchParam";
import c from "classnames";

type NavigationType = {
  current: boolean;
  name: string;
  href: string;
  subItems?: NavigationType[];
};

export default function SidebarUI({
  navigation,
}: {
  navigation: NavigationType[];
}) {
  if (!navigation) {
    navigation = [];
  }

  return (
    <div
      style={{
        height: "100%",
        minWidth: "17rem",
        backgroundColor: "#1A202C",
        padding: "1rem",
        fontFamily: "sans-serif",
        fontSize: "0.875rem",
        color: "#CBD5E0",
      }}
    >
      <h1
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          fontSize: "1.25rem",
        }}
      >
        <InboxIcon
          style={{
            marginRight: "0.5rem",
            height: "1.5rem",
            width: "1.5rem",
            color: "#4F46E5",
          }}
        />
        Emails
      </h1>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {navigation.map((item) => (
          <li key={item.href}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "0.375rem",
                padding: "0.5rem 0",
              }}
            >
              <InboxStackIcon
                style={{ marginRight: "0.5rem", height: "1rem", width: "1rem" }}
              />
              {item.name}
            </div>

            {item.subItems && (
              <ul
                style={{
                  marginTop: "-0.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                  paddingLeft: "1rem",
                }}
              >
                {item.subItems.map((subItem: NavigationType) => {
                  const Icon = subItem.current
                    ? EnvelopeOpenIcon
                    : EnvelopeIcon;

                  //hover: {
                  //backgroundColor: subItem.current
                  //? "#4F46E5"
                  //: "#4F46E5",
                  //color: subItem.current ? "#CBD5E0" : "#CBD5E0",
                  //},
                  return (
                    <li
                      key={subItem.href}
                      style={{
                        borderRadius: "0.375rem",
                        padding: "0.5rem",
                        backgroundColor: subItem.current
                          ? "#4F46E5"
                          : "transparent",
                        color: subItem.current ? "#CBD5E0" : "#A0AEC0",
                      }}
                    >
                      <a
                        href={subItem.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <Icon
                          style={{
                            marginRight: "0.5rem",
                            height: "1rem",
                            width: "1rem",
                          }}
                        />
                        {subItem.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
