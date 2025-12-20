import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

// stateful component
export function Search({ query, setQuery }) {
  useEffect(function () {
    // imperative, not declarative
    // const el = document.querySelector(".search");
    // el.focus();
  }, []);
  const inputEl = useRef(null); // when storing dom elements, start with null

  useKey("Enter", function () {
    console.log(document.activeElement === inputEl.current);
    if (document.activeElement === inputEl.current) return;
    inputEl?.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
