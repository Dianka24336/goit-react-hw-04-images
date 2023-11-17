import { useState } from 'react';
import { StyledSearchbarHeader } from './Searchbar.styled';
import { toast } from 'react-toastify';
import { ReactComponent as SearchIcon } from './search.svg';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.warning('Please enter key words for the search');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <StyledSearchbarHeader>
        <form className="form" onSubmit={handleSubmit}>
          <button type="submit" className="button">
            <span className="buttonLabel">
              <SearchIcon />
            </span>
          </button>

          <input
            className="input"
            type="text"
            name="query"
            value={query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </StyledSearchbarHeader>
    </>
  );
};
