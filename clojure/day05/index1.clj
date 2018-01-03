(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))

(def jumps (->> "./input"
  slurp
  s/split-lines
  (map parse-int)
  (into [])
))

(def l (count jumps))

(def cnt (loop [
  i 0
  jumps jumps
  cnt 0
] (
  if (or (< i 0) (>= i l)) cnt (
    recur (+ i (get jumps i)) (update jumps i inc) (inc cnt)
  )
)))

(println cnt)