import { defineStore } from "pinia";
import { ref } from "vue";

import { api } from "@/api/axios";
import { encryptStorage } from "@/utils/storage";
import type { StorageLike } from "pinia-plugin-persistedstate";
import type { IParams } from "@/types/GlobalType";
import type { CreateScopeInterface } from "../types/ScopeType";
import type { UpdateConsMatInterface } from "../types/ConsumableMaterialType";
import type { UpdateManPowerInterface } from "../types/ManpowerType";
import type { UpdatePartInterface } from "../types/PartType";
import type { CreateAddScopeInterface } from "../types/AddScopeTableType";
import type { UpdateToolsInterface } from "../types/ToolsType";

export const useMainStore = defineStore(
  "main",
  () => {
    const getScopeStandar = async (payload: IParams) => {
      return await api
        .get(`/transaction/scope-standart/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createScopeStandar = async (payload: CreateScopeInterface) => {
      return await api
        .post(`/transaction/scope-standart/resource/asset`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteScopeStandar = async (id: string) => {
      return await api
        .delete(`/transaction/scope-standart/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getConsMat = async (payload: IParams) => {
      return await api
        .get(`/transaction/consumable-material/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateConsMat = async (
      payload: UpdateConsMatInterface,
      id: string
    ) => {
      return await api
        .put(`/transaction/consumable-material/${id}`, payload)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getManPower = async (payload: IParams) => {
      return await api
        .get(`/transaction/manpower/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateManPower = async (
      payload: UpdateManPowerInterface,
      id: string
    ) => {
      return await api
        .put(`/transaction/manpower/${id}`, payload)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getPart = async (payload: IParams) => {
      return await api
        .get(`/transaction/part/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updatePart = async (payload: UpdatePartInterface, id: string) => {
      return await api
        .put(`/transaction/part/${id}`, payload)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getTools = async (payload: IParams) => {
      return await api
        .get(`/transaction/tools`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateTools = async (payload: UpdateToolsInterface, id: string) => {
      return await api
        .put(`/transaction/tools/${id}`, payload)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getHse = async (payload: IParams) => {
      return await api
        .get(`/transaction/hse/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getQcPlan = async (payload: IParams) => {
      return await api
        .get(`/transaction/qc-plan/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getAddScope = async (payload: IParams) => {
      return await api
        .get(`/transaction/additional-scope/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createAddScope = async (payload: CreateAddScopeInterface) => {
      return await api
        .post(`/transaction/additional-scope/resource/asset`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDetailInspection = async (id: string) => {
      return await api
        .get(`/inspection-type/${id}`)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDownloadResultScope = async () => {
      return await api
        .get(`/transaction/result/resource/export/scope-standart`, {
          responseType: "blob",
        })
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Scope.xlsx`;

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(url);

          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDownloadResultConsMat = async () => {
      return await api
        .get(`/transaction/result/resource/export/consmat`, {
          responseType: "blob",
        })
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Consumable Material.xlsx`;

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(url);

          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDownloadResultPart = async () => {
      return await api
        .get(`/transaction/result/resource/export/part`, {
          responseType: "blob",
        })
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Part.xlsx`;

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(url);

          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDownloadResultManpower = async () => {
      return await api
        .get(`/transaction/result/resource/export/manpower`, {
          responseType: "blob",
        })
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Manpower.xlsx`;

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(url);

          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    return {
      getScopeStandar,
      createScopeStandar,
      deleteScopeStandar,
      getConsMat,
      updateConsMat,
      getManPower,
      updateManPower,
      getPart,
      updatePart,
      getTools,
      updateTools,
      getHse,
      getQcPlan,
      getAddScope,
      createAddScope,
      getDetailInspection,
      getDownloadResultScope,
      getDownloadResultConsMat,
      getDownloadResultPart,
      getDownloadResultManpower,
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
