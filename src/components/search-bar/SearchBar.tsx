// React

import { useMemo, useState } from "react";

// Styles

import classes from "./styles.module.css";

interface SearchBarProps {
  results: string[];
  onSelect: (selection: string) => void;
  style?: React.CSSProperties;
}

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { results, onSelect, style } = props;

  const [searchString, setSearchString] = useState<string>("");

  const filteredResults: string[] = useMemo(
    () =>
      results.filter(
        (result) =>
          result.toUpperCase().indexOf(searchString.toUpperCase()) !== -1
      ),
    [results, searchString]
  );

  const inputStyle: React.CSSProperties | undefined = useMemo(
    () =>
      searchString
        ? {
            ...style,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }
        : style,
    [searchString, style]
  );

  return (
    <div className={classes.searchBar}>
      <input
        type="text"
        className={classes.input}
        style={inputStyle}
        value={searchString}
        placeholder={"Search..."}
        onChange={(event) => {
          setSearchString(event.target.value);
        }}
      />
      {searchString && filteredResults.length > 0 && (
        <div className={classes.resultsContainer}>
          {filteredResults.map((result) => {
            return (
              <div
                key={result}
                className={classes.result}
                onClick={() => {
                  onSelect(result);
                  setSearchString("");
                }}
              >
                {result}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
