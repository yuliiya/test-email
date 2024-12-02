import { useQuery } from 'react-query';
import { apiClient } from '../client';
import { labelsSchema, Label } from './schemas';

const fetchLabels = async (): Promise<Label[]> => {
  const response = await apiClient.get(`/labels`);
  return labelsSchema.parse(response.data.labels);
};

export const useLabels = () => {
  return useQuery(['labels'], () => fetchLabels(), {
    onError: (error: unknown) => {
      console.error('Error fetching labels:', error);
    },
  });
};
