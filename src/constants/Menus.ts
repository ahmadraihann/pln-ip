export const Menus = [
  {
    id: 1,
    name: "Home",
    url: "/",
    icon: "home",
  },
  {
    id: 2,
    name: "Squences",
    url: "/squences",
    icon: "forward-message",
  },
  {
    id: 3,
    name: "Scope",
    url: "/scope",
    icon: "document",
  },
  {
    id: 4,
    name: "Instruksi Kerja",
    url: "/work-instruction",
    icon: "checklist",
  },
  {
    id: 5,
    name: "Consumable Material",
    url: "/consumable-material",
    icon: "box",
  },
  {
    id: 6,
    name: "Manpower",
    url: "/manpower",
    icon: "male",
  },
  {
    id: 7,
    name: "Part",
    url: "/part",
    icon: "trolley-items",
  },
  {
    id: 8,
    name: "HSE",
    url: "/hse",
    icon: "construction-worker",
  },
  {
    id: 9,
    name: "QC Plan",
    url: "/qc-plan",
    icon: "mind-gear",
  },
  {
    id: 10,
    name: "Add Scope",
    url: "/add-scope",
    icon: "login",
    children: [
      {
        id: 11,
        name: "Table",
        url: "/add-scope-table",
      },
      {
        id: 12,
        name: "Squences",
        url: "/add-scope-squences",
      },
    ],
  },
];
