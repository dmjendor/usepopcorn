import { useEffect, useRef } from "react";

// stateful component
export function Search({ query, setQuery }) {
  useEffect(function () {
    // imperative, not declarative
    // const el = document.querySelector(".search");
    // el.focus();
  }, []);
  const inputEl = useRef(null); // when storing dom elements, start with null

  useEffect(function () {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback);
  }, []);
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
