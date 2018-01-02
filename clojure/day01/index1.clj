(require '[clojure.string :as s])

(def parseInt #(Integer/parseInt %))

(def input
  (into [] (map parseInt (s/split (s/trim (slurp "./input")) #""))))

(def l (count input))
(def input' (conj input (first input)))

(def res (loop [sum 0 i 0]
           (if (== i l)
              sum
              (recur 
                (+ sum (if-not (== (get input' i) (get input' (+ 1 i))) 0 (get input' i)))
                (+ i 1)))))

(println res)
