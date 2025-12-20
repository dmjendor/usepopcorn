import { useEffect } from "react";
export function useKey(key, callback) {
  useEffect(
    function () {
      document.addEventListener("keydown", function (e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          callback();
        }
      });
    },
    [callback, key]
  );
}
