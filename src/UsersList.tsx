import * as React from 'react';
// context
import { GithubContext, fetchMoreUsers } from './context/github';
// style
import './UsersList.css';
// constants
import { PER_PAGE } from './constants';
// hooks
import useOnScreen from './hooks/useOnScreen';
import useOnWindowScroll from './hooks/useOnWindowScroll';

interface Props {
  loading: boolean;
  error: string;
  term: string;
}

const UsersList: React.FC<Props> = ({ loading, error, term }) => {
  const { users, noResult, dispatch, page, totalCount } =
    React.useContext(GithubContext);
  const [loadingMoreUsers, setLoadingMoreUsers] = React.useState(false);
  const lastElementRef = React.useRef<HTMLDivElement>(null);
  const { isOnScreen } = useOnScreen(lastElementRef);

  const handleScroll = React.useCallback(async (): Promise<void> => {
    if (lastElementRef.current) {
      if (
        isOnScreen(lastElementRef.current) &&
        !loadingMoreUsers &&
        page * PER_PAGE < totalCount
      ) {
        setLoadingMoreUsers(true);
        await fetchMoreUsers(term, page, dispatch);
        setLoadingMoreUsers(false);
      }
    }
  }, [dispatch, loadingMoreUsers, page, totalCount, term, isOnScreen]);

  useOnWindowScroll(handleScroll);

  if (loading) return <p className="loading">we&apos;re loading. hang on</p>;
  if (error) return <p className="error">{error}</p>;
  if (noResult) {
    return (
      <p className="empty">
        make sure not to input gibberish but something we can find
      </p>
    );
  }

  return (
    <section className="users">
      {users.map((user, i) => (
        // FIXME: sometimes github send the same user twice and keys match, using idx instead
        <div
          className="user"
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          ref={i === users.length - 1 ? lastElementRef : null}
        >
          <img
            className="user__avatar"
            src={user.avatar_url}
            alt={user.login}
          />
          <div className="user__info">
            <span className="user__name">{user.login}</span>
            <a
              href={user.html_url}
              className="user__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              see user&apos;s profile on github
            </a>
          </div>
        </div>
      ))}
      {loadingMoreUsers && (
        <p className="loading">we&apos;re loading more users. hang on</p>
      )}
    </section>
  );
};

export default UsersList;
