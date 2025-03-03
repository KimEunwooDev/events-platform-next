import { useAtom } from "jotai";
import styles from "./SearchBar.module.scss";
import { SetStateAction, useState } from "react";
import { Search } from "lucide-react";
import { searchAtom } from "@/stores/atoms";

export default function SearchBar() {
  const [, setSearch] = useAtom<string>(searchAtom);
  const [text, setText] = useState<string>("");

  const onChange = (event: { target: { value: SetStateAction<string> } }) => {
    setText(event.target.value);
  };

  const onSearch = () => {
    if (text === "") {
      setSearch("");
    } else {
      console.log(text, "text in searchbar");
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
        <Search className="opacity-30 cursor-pointer" onClick={onSearch} />
      </div>
    </div>
  );
}
