(require '[clojure.string :as s])

(def parseInt #(Integer/parseInt %))

(def input
  (into [] (map parseInt (s/split (s/trim (slurp "./input")) #""))))

(def l (count input))

(defn nxt [i] (mod (+ i (/ l 2)) l))

(def res (loop [sum 0 i 0]
           (if (== i l)
              sum
              (recur 
                (+ sum (if-not (== (get input i) (get input (nxt i))) 0 (get input i)))
                (+ i 1)))))

(println res)