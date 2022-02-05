import * as React from 'react';
// context
import { GithubContext, fetchMoreUsers } from './context/github';
// style
import './UsersList.css';
// constants
import { PER_PAGE } from './constants';

interface Props {
  loading: boolean;
  error: string;
  term: string;
}

const UsersList: React.FC<Props> = ({ loading, error, term }) => {
  const { dispatch, users, page, totalCount } = React.useContext(GithubContext);
  const [loadingMoreUsers, setLoadingMoreUsers] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  const handleScroll = async (): Promise<void> => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;

      if (
        scrollTop + clientHeight === scrollHeight &&
        !loadingMoreUsers &&
        page * PER_PAGE < totalCount
      ) {
        setLoadingMoreUsers(true);

        await fetchMoreUsers(term, page, dispatch);

        setLoadingMoreUsers(false);
      }
    }
  };

  if (loading) return <p className="loading">we&apos;re loading. hang on</p>;
  if (error) return <p className="error">{error}</p>;
  if (users.length === 0) {
    return (
      <p className="empty">
        either start typing so that we can find github accounts or input
        something that we can find
      </p>
    );
  }

  return (
    <section className="users" onScroll={handleScroll} ref={ref}>
      {users.map((user, i) => (
        // FIXME: sometimes github send the same user twice and keys match, using idx instead
        // eslint-disable-next-line react/no-array-index-key
        <div className="user" key={i}>
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
