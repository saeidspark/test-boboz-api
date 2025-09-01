export function buildOpenSeaJson(
  base: any,
  dyn: { xp: number; level: number },
  externalUrl?: string
) {
  const attrs = [
    ...base.attributes,
    { trait_type: "XP", value: dyn.xp, display_type: "number" },
    { trait_type: "Level", value: dyn.level, display_type: "number", max_value: 13 },
  ];
  const result: any = {
    name: base.name,
    description: base.description || "",
    image: base.image,
    attributes: attrs,
  };
  if (externalUrl) result.external_url = externalUrl;
  return result;
}
