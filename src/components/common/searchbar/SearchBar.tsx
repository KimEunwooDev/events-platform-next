import styles from "./SearchBar.module.scss";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState<string>();
  const [text, setText] = useState<string>("");

  const onChange = (event) => {
    setText(event.target.value);
  };

  const onSearch = () => {
    if (text === "") {
      setSearch("Korea");
    } else {
      setSearch(text);
    }
  };

  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (text === "") {
        setSearch("");
      } else {
        setSearch(text);
      }
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input
          type="text"
          placeholder="Search events"
          className={styles.searchBar__search__input}
          value={text}
          onChange={onChange}
          onKeyDown={handleKeydown}
        />
        {/* <img src="src/assets/icons/icon-search.svg" alt="" onClick={onSearch} /> */}
      </div>
    </div>
  );
}
