interface BaseData {
  name: string;
  description: string;
  image: string;
  attributes: any[];
}

interface DynData {
  xp: number;
  level: number;
}

// 👇 تابعی برای تبدیل ipfs:// به gateway
function ipfsToHttp(uri: string) {
  if (uri.startsWith("ipfs://")) {
    // می‌تونی هر گیتوی که دوست داری بذاری
    return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
    // یا thirdweb خودش از این استفاده می‌کنه:
    // return uri.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/");
  }
  return uri;
}

export const buildOpenSeaJson = (base: BaseData, dyn: DynData, url?: string) => {
  return {
    name: base.name,
    description: base.description,
    image: ipfsToHttp(base.image), // 👈 اینجا حتماً تبدیل می‌کنیم
    external_url: url,
    attributes: [
      ...base.attributes,
      { trait_type: "XP", value: dyn.xp },
      { trait_type: "Level", value: dyn.level }
    ]
  };
};
