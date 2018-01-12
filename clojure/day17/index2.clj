(def STEP 316)
(def MAX 5e7)

(def res (loop [
  i 0
  zero-ind 0
  ans nil
  v 1
] (if (> v MAX) ans
    (let [
      i' (mod (+ i STEP) v)
      zero-ind' (if (< i' zero-ind) (inc zero-ind) zero-ind)
      ans' (if (== i' zero-ind) v ans)
    ] (recur (inc i') zero-ind' ans' (inc v))))))

(println res)
