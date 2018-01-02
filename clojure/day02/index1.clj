(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))

(defn split [p s] (s/split s p))

(def matrix-str (slurp "./input"))

(defn parse-row [s] (->> s
  (split #"\t")
  (map parse-int)
))

(def matrix (->> matrix-str
  s/split-lines
  (map parse-row)
))

(defn sum [a] (reduce + 0 a))

(println (->> matrix
  (map (fn [r] (- (apply max r) (apply min r))))
  sum
))
