(defn gen [curr build-next test]
  (loop [
    curr curr
    next (build-next curr)
  ]
    (if (test curr) [curr (fn [] (gen next build-next test))]
      (let [
        next' (build-next next)
      ] (recur next next')))))

(defn rnd-gen [seed factor modulo d]
  (let [
    build-next (fn [curr] (mod (* curr factor) modulo))
    test #(== 0 (mod % d))
  ] (gen seed build-next test)))

(def ITERS 5e6)
(def FACTOR_A 16807)
(def FACTOR_B 48271)
(def MODULO 2147483647)
(def COMP_BITS 16)

(def D_A 4)
(def D_B 8)
  
(def START_A 634)
(def START_B 301)

(def m (int (Math/pow 2 COMP_BITS)))

(def res (loop [
  i 0
  res 0
  a-gen (rnd-gen START_A FACTOR_A MODULO D_A)
  b-gen (rnd-gen START_B FACTOR_B MODULO D_B)
]
  (if (== i ITERS) res
    (let [
      [a a-gen'] a-gen
      [b b-gen'] b-gen
      inc-res (if (== 0 (mod (- a b) m)) 1 0)
    ] (recur (inc i) (+ res inc-res) (a-gen') (b-gen'))))))

(println res)

