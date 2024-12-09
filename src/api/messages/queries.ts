import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'src/api/constants.ts';

import { convertMessageData } from '../../utils/convertMessageData.ts';
import { apiClient } from '../client';
import {
  ConvertedMessage,
  convertedMessageSchema,
  Message,
  MessagesResponse,
  ModifyMessageParams,
  modifyMessageSchema,
} from './schemas';

const fetchMessageDetails = async (messageId: string, format: 'metadata' | 'full' = 'metadata'): Promise<Message> => {
  const response = await apiClient.get(`/messages/${messageId}`, {
    params: {
      format,
    },
  });

  return response.data;
};

const fetchMessages = async (labelId: string): Promise<ConvertedMessage[]> => {
  const response: { data: MessagesResponse } = await apiClient.get(`/messages`, {
    params: {
      labelIds: labelId.toUpperCase(),
      maxResults: 10,
    },
  });

  const messages = response.data.messages || [];

  if (response.data.resultSizeEstimate === 0) return [];

  return await Promise.all(
    messages.map(async ({ id }) => {
      const details = await fetchMessageDetails(id);

      return convertedMessageSchema.parse(convertMessageData(details));
    }),
  );
};

const deleteMessage = async (messageId: string) => await apiClient.delete(`/messages/${messageId}`);

export const modifyMessage = async ({ messageId, isRead }: ModifyMessageParams): Promise<Message> => {
  const labels = isRead ? { removeLabelIds: ['UNREAD'] } : { addLabelIds: ['UNREAD'] };

  const response = await apiClient.post(`/messages/${messageId}/modify`, labels);

  return response.data;
};

export const useMessages = (labelId: string) =>
  useQuery({
    queryKey: [queryKeys.messages, labelId],
    queryFn: async () => {
      return await fetchMessages(labelId);
    },
    refetchOnWindowFocus: false,
  });

export const useMessageDetails = (messageId: string) =>
  useQuery<Message>({
    queryKey: [queryKeys.messageDetails, messageId],
    queryFn: () => fetchMessageDetails(messageId, 'full'),
    enabled: !!messageId,
  });

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: string) => {
      await deleteMessage(messageId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.messages] });
    },
  });
};

export const useModifyMessageStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<Message, Error, ModifyMessageParams, { previousMessages?: Message[] }>({
    mutationFn: async (params) => {
      modifyMessageSchema.parse(params);

      return modifyMessage(params);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.messages] });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.messageDetails] });
    },
  });
};
