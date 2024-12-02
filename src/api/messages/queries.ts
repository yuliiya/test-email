import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryKeys } from 'src/api/constants.ts';

import { convertMessageData } from '../../utils/convertMessageData.ts';
import { apiClient } from '../client';
import { ConvertedMessage, Message, MessagesResponse, ModifyMessageParams, modifyMessageSchema } from './schemas';

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

      return convertMessageData(details);
    }),
  );
};

const deleteMessage = async (messageId: string) => {
  await apiClient.delete(`/messages/${messageId}`);
};

export const modifyMessage = async ({ messageId, isRead }: ModifyMessageParams): Promise<Message> => {
  const labels = isRead ? { removeLabelIds: ['UNREAD'] } : { addLabelIds: ['UNREAD'] };

  const response = await apiClient.post(`/messages/${messageId}/modify`, labels);
  return response.data;
};

export const useMessages = (labelId: string) => {
  return useQuery([queryKeys.messages, labelId], async () => {
    return await fetchMessages(labelId);
  });
};

export const useMessageDetails = (messageId: string) => {
  return useQuery<Message, Error>([queryKeys.messageDetails, messageId], () => fetchMessageDetails(messageId, 'full'), {
    enabled: !!messageId,
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (messageId: string) => {
      await deleteMessage(messageId);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKeys.messages);
      },
    },
  );
};

export const useModifyMessageStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<Message, Error, ModifyMessageParams, { previousMessages?: Message[] }>(
    async (params) => {
      modifyMessageSchema.parse(params);

      return modifyMessage(params);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKeys.messages);
        await queryClient.invalidateQueries(queryKeys.messageDetails);
      },
    },
  );
};
