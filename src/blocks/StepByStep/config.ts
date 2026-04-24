import type { Block } from "payload";

export const StepByStep: Block = {
  slug: "stepByStep",
  interfaceName: "StepByStepBlock",
  labels: {
    singular: "Step by Step",
    plural: "Step by Step Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titel (optional)",
    },
    {
      name: "steps",
      type: "array",
      label: "Schritte",
      minRows: 1,
      fields: [
        {
          name: "stepTitle",
          type: "text",
          label: "Schrittüberschrift",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Beschreibung (optional)",
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};
