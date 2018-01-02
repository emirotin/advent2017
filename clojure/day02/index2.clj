(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))

(defn split [p s] (s/split s p))

(def matrix-str (slurp "./input"))

(defn parse-row [s] (->> s
  (split #"\t")
  (map parse-int)
  (into [])
))

(def matrix (->> matrix-str
  s/split-lines
  (map parse-row)
))

(defn sum [a] (reduce + 0 a))

(defn find-div [r]
  (let [
    r' (->> r sort (into []))
    l (count r)
  ] 
  (loop [i 0 j 1] (
      let [
        x (get r' i)
        y (get r' j)
      ] 
      (cond
        (== i l) (throw (ex-info "Not found" {}))
        (== j l) (recur (+ i 1) (+ i 2))
        (== 0 (mod y x)) (/ y x)
        :else (recur i (inc j))
      )))))

(println (->> matrix
  (map find-div)
  sum
))