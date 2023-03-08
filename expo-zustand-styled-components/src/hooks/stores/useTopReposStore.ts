import { create } from 'zustand';
import { TopRepository } from '../../types/top-repos-type';

export interface ITopReposStore {
  topRepos: TopRepository[];
  isLoading: boolean;
  error?: string;
}

export const useTopReposStore = create<ITopReposStore>(() => ({
  topRepos: undefined,
  isLoading: true,
}));
