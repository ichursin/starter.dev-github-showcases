import { component$ } from '@builder.io/qwik';

import type { TopRepo } from './types';

import * as styles from './top-repos.className';
import { RepoCard } from '~/components/repo-card/repo-card';
import { SPECIAL_PERIOD_CHAR } from '~/utils/constants';

interface UserTopReposViewProps {
  login: string;
  repos: TopRepo[];
}
export default component$(({ repos, login }: UserTopReposViewProps) => {
  if (repos.length === 0) {
    return <div>No repositories found</div>;
  }

  return (
    <div className={styles.container}>
      {repos.map((repo) => (
        <RepoCard repo={repo} styles={styles} />
      ))}
      <div className={styles.linkContainer}>
        <a href={`/${login.replace(/\./g, SPECIAL_PERIOD_CHAR)}`} className={styles.allRepoLink}>
          View all repositories
        </a>
      </div>
    </div>
  );
});