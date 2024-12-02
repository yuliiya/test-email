import { useHotkeys } from 'react-hotkeys-hook';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { queryKeys } from 'src/api/constants.ts';
import { useDeleteMessage, useModifyMessageStatus } from 'src/api/messages/queries.ts';
import { Message } from 'src/api/messages/schemas.ts';
import { ROUTES } from 'src/routes/constants.ts';
import { getMessageStatus } from 'src/utils/convertMessageData.ts';
import { hotkeysConfig } from 'src/utils/hotkeysConfig.ts';

export const useMessageActions = (messageId: string | null) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteMessage, isLoading: isDeleting } = useDeleteMessage();
  const { mutate: modifyMessageStatus } = useModifyMessageStatus();

  const messageDetails = queryClient.getQueryData<Message>([queryKeys.messageDetails, messageId]);

  const labels = messageDetails?.labelIds;
  const { isRead } = labels ? getMessageStatus(labels) : {};

  const handleDelete = () => {
    if (messageId) {
      deleteMessage(messageId);
      navigate(ROUTES.INBOX);
    }
  };

  const handleToggleIsReadStatus = (isRead: boolean) => {
    if (messageId) {
      modifyMessageStatus({ messageId, isRead });
    }
  };

  useHotkeys(hotkeysConfig.message.delete.key, handleDelete);
  useHotkeys(hotkeysConfig.message.toggle.key, () => handleToggleIsReadStatus(!isRead), {}, [isRead]);

  return {
    handleDelete,
    isDeleting,
    handleToggleIsReadStatus,
  };
};
