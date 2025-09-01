type KV = {
  get: (key: string) => Promise<any>;
  set: (key: string, value: any) => Promise<boolean>;
};

const fallback = new Map<string, any>();

export const kv: KV = {
  get: async (key) => fallback.get(key),
  set: async (key, value) => {
    fallback.set(key, value);
    return true;
  },
};

export const baseKey = (id: string | number) => `nft:${id}:base`;
export const dynKey = (id: string | number) => `nft:${id}:dyn`;
