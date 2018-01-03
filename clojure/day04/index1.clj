(require '[clojure.string :as s])

(def parse-line #(s/split % #" "))

(def lines (->> "./input"
  slurp
  s/trim
  s/split-lines
  (map parse-line)
))

(defn is-valid* [acc words] (
  if (== (count words) 0) true (
    let [
      w (first words)
      words' (rest words)
    ](if (get acc w) false 
      (is-valid* (assoc acc w true) words')
    )
  )
))

(defn is-valid [words] (is-valid* {} words))

(println (->> lines
  (filter is-valid)
  count
))
