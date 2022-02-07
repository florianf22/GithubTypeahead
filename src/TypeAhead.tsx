import * as React from 'react';
// context
import { GithubContext, fetchAndSetUsers, clearUsers } from './context/github';
// style
import './TypeAhead.css';
// components
import UsersList from './UsersList';

const TypeAhead: React.FC = () => {
  const { dispatch } = React.useContext(GithubContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [term, setTerm] = React.useState('');

  React.useEffect(() => {
    if (!term) {
      return clearUsers(dispatch);
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        await fetchAndSetUsers(term, dispatch);
        setLoading(false);
      } catch (err: unknown) {
        setError("can't fetch users. try to reload your page 🙄");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [term, dispatch]);

  return (
    <>
      <section className="typeahead">
        <input
          type="text"
          className="typeahead__input"
          placeholder="find  user"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
      </section>
      <UsersList loading={loading} error={error} term={term} />
    </>
  );
};

export default TypeAhead;
