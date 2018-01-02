(require '[clojure.string :as s])

(def parseInt #(Integer/parseInt %))

(defn split [p s] (s/split s p))

(def input (->> "./input"
  slurp
  s/trim
  (split #"")
  (map parseInt)
  (into [])
))

(def l (count input))
(def input' (conj input (first input)))

(def res (loop [sum 0 i 0]
           (if (== i l)
              sum
              (recur 
                (+ sum (if-not (== (get input' i) (get input' (inc i))) 0 (get input' i)))
                (inc i)))))

(println res)
