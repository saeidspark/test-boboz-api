import { z } from "zod";

export const UpdateDynamicSchema = z.object({
  id: z.union([z.string(), z.number()]),
  xp: z.number().int().min(0),
  level: z.number().int().min(0).max(13),
});

export const BaseMetadataSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.string(),
  attributes: z.array(
    z.object({
      trait_type: z.string(),
      value: z.union([z.string(), z.number(), z.boolean()]),
    })
  ),
});
