// lib/kv.js
const fallback = new Map();

export const kv = {
  get: async (key) => fallback.get(key),
  set: async (key, value) => { fallback.set(key, value); return true; },
};

export const baseKey = (id) => `nft:${id}:base`;
export const dynKey = (id) => `nft:${id}:dyn`;
