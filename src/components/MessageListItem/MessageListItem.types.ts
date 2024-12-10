import { ConvertedMessage } from 'src/api/messages/schemas.ts';

export type MessageListItemProps = Omit<ConvertedMessage, 'id' | 'fullDate' | 'isDeleted'> & { isActive: boolean };
