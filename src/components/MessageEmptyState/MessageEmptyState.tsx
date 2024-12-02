import { InboxIcon } from '@heroicons/react/24/outline';

export const MessageEmptyState = () => (
  <div className="flex items-center justify-center h-screen p-6 mr-auto w-full">
    <div className="text-center">
      <InboxIcon className="h-10 w-10 inline-block" />
      <h2 className="mt-4 text-2xl text-gray-700">Ooops...</h2>
      <p className="mt-2 text-gray-500">No item selected, or the message list is empty</p>
    </div>
  </div>
);
