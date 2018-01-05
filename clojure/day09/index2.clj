(require '[clojure.string :as s])

(def input (->> "./input" slurp s/trim-newline))

(def total (loop [
    i 0
    in-garbage false
    total 0
  ] (let [
    l (count input)
  ] (if (>= i l)
      total
      (let [ch (get input i)]
        (
          case ch
            \< (let [
              total' (if in-garbage (inc total) total)
              ] (recur (inc i) true total'))
            \! (recur (+ i 2) in-garbage total)
            \> (recur (inc i) false total)
            (let [
              total' (if in-garbage (inc total) total)
              ] (recur (inc i) in-garbage total'))
      ))))
))

(println total)
