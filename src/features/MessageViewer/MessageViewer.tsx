import { FC, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useMessageDetails } from 'src/api/messages/queries.ts';
import { MessageEmptyState } from 'src/components/MessageEmptyState';
import { MessageViewerSkeleton } from 'src/components/MessageViewerSkeleton';
import { useMessageActions } from 'src/hooks/useMessageActions.ts';
import { convertMessageData } from 'src/utils/convertMessageData.ts';
import { extractEmailContent } from 'src/utils/parseMessageContent.ts';
import { removeImagesAndPreload } from 'src/utils/removeImagesAndPreload.ts';

import { MessageViewerHeader } from './components/MessageViewerHeader';

export const MessageViewer: FC = () => {
  const [searchParams] = useSearchParams();
  const messageId = searchParams.get('messageId');

  const [showImage, setShowImage] = useState(true);

  const { data, isLoading } = useMessageDetails(messageId ?? '');

  const { handleDelete, handleToggleIsReadStatus, isDeleting } = useMessageActions(messageId);

  const handleToggleImgView = () => setShowImage((prev) => !prev);

  const htmlContent = useMemo(() => {
    if (!data?.payload) return '';

    const content = extractEmailContent(data.payload);

    const html = content.html;

    if (html) return showImage ? html : removeImagesAndPreload(html);
  }, [data?.payload, showImage]);

  if (isLoading) return <MessageViewerSkeleton />;

  if (!data) return <MessageEmptyState />;

  const details = convertMessageData(data);

  return (
    <div className="w-full flex flex-col px-6 bg-white h-full overflow-hidden py-4">
      <MessageViewerHeader
        message={details}
        showImage={showImage}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        handleToggleImgView={handleToggleImgView}
        handleToggleIsReadStatus={handleToggleIsReadStatus}
      />

      <div className="space-y-4 flex-1">
        <h2 className="text-2xl font-bold">{details.subject}</h2>
        <iframe srcDoc={htmlContent} style={{ border: 'none', width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};
