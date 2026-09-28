"use client";
import { useEffect } from "react";
import { services } from "@/lib/data";

type Tool = {
  name: string;
  title: string;
  description: string;
  inputSchema: object;
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
  execute: (input: unknown) => Promise<object>;
};

/** Optional progressive enhancement; ordinary browsers use the same visible form. */
export function useBookingTool(stage: (service: string) => void) {
  useEffect(() => {
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: Tool,
            options: { signal: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      Promise.resolve(
        context.registerTool(
          {
            name: "stage_booking_service",
            title: "Обрати послугу для запису",
            description:
              "Заповнює послугу у видимій демонстраційній формі. Не підтверджує запис і не надсилає дані.",
            inputSchema: {
              type: "object",
              properties: {
                service: {
                  type: "integer",
                  minimum: 0,
                  maximum: 5,
                  description: services
                    .map((s, i) => `${i}: ${s.name}`)
                    .join("; "),
                },
              },
              required: ["service"],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            async execute(input) {
              const index = (input as { service?: unknown } | null)?.service;
              if (
                typeof index !== "number" ||
                !Number.isInteger(index) ||
                !services[index]
              )
                throw new Error("Оберіть наявну послугу від 0 до 5.");
              stage(String(index));
              document
                .getElementById("booking")
                ?.scrollIntoView({ behavior: "instant" });
              await new Promise<void>((resolve) =>
                requestAnimationFrame(() =>
                  requestAnimationFrame(() => resolve()),
                ),
              );
              return {
                service: services[index].name,
                status: "Послугу обрано. Запис ще не підтверджено.",
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {
        /* Optional browser capability. */
      });
    } catch {
      /* Browsers without the proposed API retain the complete form. */
    }
    return () => lifecycle.abort();
  }, [stage]);
}
