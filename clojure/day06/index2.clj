(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))
(defn split [p s] (s/split s p))

(def data (->> "./input"
  slurp
  s/trim
  (split #"\t")
  (map parse-int)
  (into [])
))

(defn get-max-index* [max max-index index a] (
  if (== 0 (count a)) max-index (
    let [
      e (first a)
      a' (rest a)
    ] (if (> e max)
      (recur e index (inc index) a')
      (recur max max-index (inc index) a'))
  )
))

(defn get-max-index [a] (get-max-index* 0 0 0 a))

(defn nxt [i a] (mod (inc i) (count a)))

(defn redistribute* [rem index a] (
  if (== 0 rem) a (
    recur (dec rem) (nxt index a) (update a index inc)
  )
))

(defn redistribute [a] (
  let [
    i (get-max-index a)
    rem (get a i)
    a' (assoc a i 0)
  ] (redistribute* rem (nxt i a) a')
))

(def period (loop [
  hash {}
  iter 0
  data data
] (let [
  j (get hash data)
] (if j (- iter j) (
    let [
      hash' (assoc hash data iter)
      data' (redistribute data)
    ] (recur hash' (inc iter) data')
  ))
)))

(println period)
