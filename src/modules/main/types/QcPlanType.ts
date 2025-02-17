import type { ValueUploadType } from "@/components/fields/Upload.vue";

export interface QcPlanInterface {
  id: string;
  name: string;
  document: {
    file: ValueUploadType[];
  } | null;
  note: string | null;
}

export interface ResponseQcPlanInterface {
  uuid: string;
  name: string;
  note: string | null;
  project_uuid: string;
  created_at: string;
  updated_at: string;
}
