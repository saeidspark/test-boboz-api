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

export const buildOpenSeaJson = (base: BaseData, dyn: DynData, url?: string) => {
  return {
    name: base.name,
    description: base.description,
    image: base.image,
    external_url: url,
    attributes: [
      ...base.attributes,
      { trait_type: "XP", value: dyn.xp },
      { trait_type: "Level", value: dyn.level }
    ]
  };
};
