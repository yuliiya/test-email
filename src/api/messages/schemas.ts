import { z } from 'zod';

const headersSchema = z.array(
  z.object({
    name: z.string(),
    value: z.string(),
  }),
);

const partInitSchema = z.object({
  partId: z.string(),
  mimeType: z.string(),
  filename: z.string(),
  headers: headersSchema,
  body: z.object({
    size: z.number(),
    data: z.string(),
  }),
});

const partSchema = partInitSchema.extend({
  parts: z.array(partInitSchema),
});

export const messagePartSchema = z.object({
  partId: z.string().optional(),
  mimeType: z.string().optional(),
  filename: z.string().optional(),
  headers: headersSchema,
  body: z
    .object({
      size: z.number(),
      data: z.string().optional(),
      attachmentId: z.string().optional(),
    })
    .optional(),
  parts: z.array(partSchema).optional(),
});

export const messageSchema = z.object({
  id: z.string(),
  threadId: z.string(),
  labelIds: z.array(z.string()),
  snippet: z.string(),
  historyId: z.string(),
  internalDate: z.string(),
  payload: messagePartSchema,
  sizeEstimate: z.number(),
  raw: z.string().optional(),
});

export const previewMessageSchema = z.object({
  id: z.string(),
  threadId: z.string(),
});

export const messagesResponseSchema = z.object({
  messages: z.array(previewMessageSchema).optional(),
  resultSizeEstimate: z.number(),
});

export const modifyMessageSchema = z.object({
  messageId: z.string().min(1, 'Message ID is required'),
  isRead: z.boolean(),
});

export const convertedMessageSchema = z.object({
  isRead: z.boolean(),
  isDeleted: z.boolean(),
  id: z.string(),
  from: z.string(),
  subject: z.string(),
  content: z.string(),
  date: z.string(),
  fullDate: z.string(),
});

export type ModifyMessageParams = z.infer<typeof modifyMessageSchema>;

export type MessagePart = z.infer<typeof messagePartSchema>;
export type Message = z.infer<typeof messageSchema>;
export type MessagesResponse = z.infer<typeof messagesResponseSchema>;
export type ConvertedMessage = z.infer<typeof convertedMessageSchema>;

export type HeadersType = z.infer<typeof headersSchema>;
