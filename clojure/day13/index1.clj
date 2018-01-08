(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))
(defn split [p s] (s/split s p))

(defn parse-line [line] (->> line (split #"\s*:\s*") (map parse-int)))

(def data (->>
  "./input"
  slurp
  s/trim-newline
  s/split-lines
  (map parse-line)
  (reduce (fn [acc [l d]] (assoc acc l d)) {})))

(def max-layer (apply max (keys data)))

(defn get-pos [d t] (let [
  m (- (* 2 d) 2)
  i (mod t m)
] (if (>= i d) (- m i) i)))

(def res (loop [
  i 0
  s 0
] (if (> i max-layer) s
    (let [
      d (get data i)
      s' (if (and d (== 0 (get-pos d i)))
          (+ s (* i d))
          s)
    ] (recur (inc i) s')))))

(println res)