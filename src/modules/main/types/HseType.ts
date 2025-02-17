import type { ValueUploadType } from "@/components/fields/Upload.vue";

export interface HseInterface {
  id: string;
  name: string;
  document: {
    file: ValueUploadType[];
  } | null;
  note: string | null;
}

export interface ResponseHseInterface {
  uuid: string;
  project_uuid: string;
  title: string;
  created_at: string;
  updated_at: string;
}
