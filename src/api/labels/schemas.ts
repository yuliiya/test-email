import { z } from 'zod';

export const labelSchema = z.object({
  id: z.string(),
  name: z.string(),
  labelListVisibility: z.enum(['labelShow', 'labelHide']).optional(),
  messageListVisibility: z.enum(['show', 'hide']).optional(),
  type: z.enum(['system', 'user']),
});

export const labelsSchema = z.array(labelSchema);

export type Label = z.infer<typeof labelSchema>;
