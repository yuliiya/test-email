import { EnvelopeOpenIcon, TrashIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { ConvertedMessage } from 'src/api/messages/schemas.ts';
import { Button } from 'src/components/ui/Button/Button.tsx';

interface MessageViewerHeaderProps {
  message: ConvertedMessage;
  isDeleting: boolean;
  handleDelete: () => void;
  handleToggleIsReadStatus: (status: boolean) => void;
}

export const MessageViewerHeader: FC<MessageViewerHeaderProps> = ({
  isDeleting,
  handleDelete,
  handleToggleIsReadStatus,
  message: { from, isDeleted, fullDate, isRead },
}) => {
  return (
    <div className="flex justify-end items-center mb-4">
      <p className="text-sm text-gray-700 mr-auto">
        <strong>From:</strong> {from}
      </p>
      <div className="flex space-x-1 mr-3">
        <Button onClick={() => handleToggleIsReadStatus(!isRead)} className="rounded p-1.5 hover:bg-gray-100">
          <EnvelopeOpenIcon className="h-5 w-5" />
        </Button>
        {!isDeleted && (
          <Button
            onClick={handleDelete}
            className="rounded p-1.5 hover:bg-gxray-100 disabled:opacity-15"
            disabled={isDeleting}
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        )}
      </div>
      <p className="text-sm text-gray-500">{fullDate}</p>
    </div>
  );
};
