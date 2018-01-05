(require '[clojure.string :as s])

(def input (->> "./input" slurp s/trim-newline))

(defn clear-garbage [input] (
  loop [
    res []
    start 0
    i 0
    in-garbage false
  ] (let [
    l (count input)
  ] (if (>= i l)
      (let [
        rem (subs input start)
        res' (conj res rem)
      ] (s/join "" res'))
      (let [ch (get input i)]
        (
          case ch
            \< (let [
                res' (if in-garbage res (conj res (subs input start i)))
              ] (recur res' start (inc i) true))
            \! (recur res start (+ i 2) in-garbage)
            \> (recur res (inc i) (inc i) false)
            (recur res start (inc i) in-garbage)
      ))))))

(def cleared-input (s/replace (clear-garbage input) #"[^{}]" ""))

(def total (loop [
  total 0
  current-weight 0
  rem-input cleared-input
] (if (== 0 (count rem-input)) total
  (let [
    ch (first rem-input)
    rem-input' (rest rem-input)
  ] (if (= ch \{)
      (recur total (inc current-weight) rem-input')
      (recur (+ total current-weight) (dec current-weight) rem-input')
  )))))

(println total)
