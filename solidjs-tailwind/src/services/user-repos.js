import { useAuth } from "../auth";
import FetchApi from "./api";
import { USER_REPOS_QUERY } from "./queries/all-repos";

const getUserRepos = async ({
  url
}) => {
  const { authStore } = useAuth();
  const data = {
    url,
    query: USER_REPOS_QUERY,
    variable: null,
    headersOptions: {
      authorization: `Bearer ${authStore.token}`,
    }
  }
  const resp = await FetchApi(data);
   const nodes = resp?.owner?.repositories?.nodes;
   const pageInfo = resp?.owner?.repositories?.pageInfo;

  if (!nodes) {
    return undefined;
  }
  const repos = nodes?.reduce((acc, repo) => {
        return repo
          ? [
              ...acc,
              {
                id: repo.id,
                name: repo.name,
                description: repo.description,
                stargazerCount: repo.stargazerCount,
                forkCount: repo.forkCount,
                primaryLanguage: {
                  name: repo.primaryLanguage?.name,
                  color: repo.primaryLanguage?.color,
                },
                visibility: repo.visibility,
                updatedAt: repo.updatedAt,
                owner: repo.owner,
              },
            ]
          : acc;
  }, []);

  return {
    pageInfo,
    repos
  };
};

export default getUserRepos;