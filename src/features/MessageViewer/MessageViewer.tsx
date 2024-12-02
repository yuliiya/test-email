import { FC } from 'react';
import { useSearchParams } from 'react-router';
import { useMessageDetails } from 'src/api/messages/queries.ts';
import { MessageEmptyState } from 'src/components/MessageEmptyState/MessageEmptyState.tsx';
import { MessageViewerHeader } from 'src/components/MessageViewerHeader/MessageViewerHeader.tsx';
import { MessageViewerSkeleton } from 'src/components/MessageViewerSkeleton/MessageViewerSkeleton.tsx';
import { useMessageActions } from 'src/hooks/useMessageActions.ts';
import { convertMessageData } from 'src/utils/convertMessageData.ts';
import { extractEmailContent } from 'src/utils/parseMessageContent.ts';

export const MessageViewer: FC = () => {
  const [searchParams] = useSearchParams();
  const messageId = searchParams.get('messageId');

  const { data, isLoading } = useMessageDetails(messageId ?? '');

  const { handleDelete, handleToggleIsReadStatus, isDeleting } = useMessageActions(messageId);

  if (isLoading) return <MessageViewerSkeleton />;

  if (!data) return <MessageEmptyState />;

  const details = convertMessageData(data);
  const content = extractEmailContent(data?.payload);

  return (
    <div className="w-full flex flex-col px-6 bg-white h-full overflow-hidden py-4">
      <MessageViewerHeader
        message={details}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        handleToggleIsReadStatus={handleToggleIsReadStatus}
      />

      <div className="space-y-4 flex-1">
        <h2 className="text-2xl font-bold">{details.subject}</h2>
        {content.html && <iframe srcDoc={content.html} style={{ border: 'none', width: '100%', height: '100%' }} />}
      </div>
    </div>
  );
};
