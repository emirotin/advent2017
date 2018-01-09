(defn gen [curr build-next]
  (let [
    next (build-next curr)
  ] [curr (fn [] (gen next build-next))]))

(defn rnd-gen [seed factor modulo]
  (let [
    build-next (fn [curr] (mod (* curr factor) modulo))
  ] (gen seed build-next)))

(def ITERS 4e7)
(def FACTOR_A 16807)
(def FACTOR_B 48271)
(def MODULO 2147483647)
(def COMP_BITS 16)

(def START_A 634)
(def START_B 301)

(def m (int (Math/pow 2 COMP_BITS)))

(def res (loop [
  i 0
  res 0
  a-gen (rnd-gen START_A FACTOR_A MODULO)
  b-gen (rnd-gen START_B FACTOR_B MODULO)
]
  (if (== i ITERS) res
    (let [
      [a a-gen'] a-gen
      [b b-gen'] b-gen
      inc-res (if (== 0 (mod (- a b) m)) 1 0)
    ] (recur (inc i) (+ res inc-res) (a-gen') (b-gen'))))))

(println res)
