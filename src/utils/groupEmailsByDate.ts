import { ConvertedMessage } from 'src/api/messages/schemas.ts';
import { getGroupByDateTitle } from 'src/utils/getDateGroup.ts';

export const groupedEmailsByDate = (data: ConvertedMessage[]) => {
  return data.reduce((acc, email) => {
    const group = getGroupByDateTitle(email.fullDate);

    if (!acc.get(group)) acc.set(group, []);
    acc.get(group)?.push(email);
    return acc;
  }, new Map<string, ConvertedMessage[]>());
};
