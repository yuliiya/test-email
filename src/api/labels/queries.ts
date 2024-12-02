import { useQuery } from 'react-query';
import { queryKeys } from 'src/api/constants.ts';

import { apiClient } from '../client';
import { Label, labelsSchema } from './schemas';

const fetchLabels = async (): Promise<Label[]> => {
  const response = await apiClient.get(`/labels`);
  return labelsSchema.parse(response.data.labels);
};

export const useLabels = () => {
  return useQuery([queryKeys.labels], () => fetchLabels(), {
    onError: (error: unknown) => {
      console.error('Error fetching labels:', error);
    },
  });
};
