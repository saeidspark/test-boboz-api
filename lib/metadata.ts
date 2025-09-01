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

function ipfsToHttp(uri: string) {
  if (uri.startsWith("ipfs://")) {
    return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
    // 👉 می‌تونی بجاش از gateway اختصاصی خودت هم استفاده کنی
    // return uri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  }
  return uri;
}

export const buildOpenSeaJson = (base: BaseData, dyn: DynData, url?: string) => {
  return {
    name: base.name,
    description: base.description,
    image: ipfsToHttp(base.image), // 👈 اینجا تبدیل می‌کنیم
    external_url: url,
    attributes: [
      ...base.attributes,
      { trait_type: "XP", value: dyn.xp },
      { trait_type: "Level", value: dyn.level }
    ]
  };
};

