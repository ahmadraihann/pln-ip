import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsPart: TableColumnType[] = [
  {
    key: "part",
    label: "Part Name",
    align: "left",
    sort: false,
  },
  // {
  //   key: "document",
  //   label: "",
  //   align: "center",
  //   sort: false,
  //   width: "150",
  // },
  {
    key: "quantity",
    label: "Quantity",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "unit",
    label: "Unit",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "number_drawing",
    label: "No. Drawing",
    align: "center",
    sort: false,
    width: "150",
  },
];
