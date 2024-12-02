import { format } from 'date-fns';

import { HeadersType, Message } from '../api/messages/schemas.ts';
import { getDateTitle } from '../utils/getDateGroup.ts';

const convertMessageDate = (timestamp: string) => {
  const timestampInMs = Number(timestamp);

  const date = new Date(timestampInMs);

  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

const getHeaderValue = (headers: HeadersType, name: string): string => {
  const header = headers.find((header) => header.name === name);
  return header ? header.value : '';
};

export const getMessageStatus = (labelIds: Message['labelIds']) => {
  return {
    isRead: !labelIds.includes('UNREAD'),
    isDeleted: labelIds.includes('TRASH'),
  };
};

export const convertMessageData = ({ id, payload, snippet, internalDate, labelIds }: Message) => {
  const status = getMessageStatus(labelIds);

  return {
    ...status,
    id: id,
    from: getHeaderValue(payload?.headers, 'From'),
    subject: getHeaderValue(payload?.headers, 'Subject'),
    content: snippet,
    date: getDateTitle(convertMessageDate(internalDate)),
    fullDate: format(convertMessageDate(internalDate), 'HH:mm d MMM yyyy'),
  };
};
