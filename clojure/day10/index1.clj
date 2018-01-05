(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))

(defn split [p s] (s/split s p))

(defn cnct [& as] (into [] (apply concat as)))

(def ls (->> "./input" slurp s/trim-newline (split #",") (map parse-int)))

(def L 256)

(def a (into [] (range L)))

(defn read-slice [a l i] (let [
  L (count a)
  m (+ i l)
  m' (min m L)
  r (subvec a i m')
](if (<= m L) r
  (cnct r (subvec a 0 (- m L))))))

(defn write-slice [a b i] (let [
  L (count a)
] (
  loop [
    a a
    i i
    rem-b b
  ]
    (if (== 0 (count rem-b)) a
      (let [
        el (first rem-b)
        rem-b' (rest rem-b)
        i' (mod i L)
        a' (assoc a i' el)
      ]
        (recur a' (inc i') rem-b'))
  ))))

(defn transform [a l i]
  (let [
    r (read-slice a l i)
    r' (reverse r)
  ] (write-slice a r' i)))

(defn run-op [a i skip l]
  (let [L (count a)]
    [(transform a l i) (mod (+ i l skip) L) (inc skip)]))

(def a' (loop [
  a a
  i 0
  skip 0
  rem-ls ls
] (if (== 0 (count rem-ls)) a
  (let [
    l (first rem-ls)
    rem-ls' (rest rem-ls)
    [a' i' skip'] (run-op a i skip l)
  ] (recur a' i' skip' rem-ls')))))

(def res (* (first a') (second a')))

(println res)
