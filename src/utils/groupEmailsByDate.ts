import { ConvertedMessage } from 'src/api/messages/schemas.ts';
import { getGroupByDateTitle } from 'src/utils/getDateGroup.ts';

export const groupedEmailsByDate = (data?: ConvertedMessage[]) => {
  if (!data) return {};

  return data?.reduce(
    (acc, email) => {
      const group = getGroupByDateTitle(email.fullDate);

      if (!acc[group]) acc[group] = [];
      acc[group].push(email);
      return acc;
    },
    {} as { [key: string]: ConvertedMessage[] },
  );
};
