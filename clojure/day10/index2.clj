(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))

(defn split [p s] (s/split s p))

(defn cnct [& as] (into [] (apply concat as)))

(def SUFFIX [17 31 73 47 23])

(defn add-suffix [a] (cnct a SUFFIX))

(def chr #(get % 0))

(def ls (->> "./input"
  slurp
  s/trim-newline
  (split #"")
  (map chr)
  (map int)
  add-suffix
  (into [])))

(defn vec-range [& args] (into [] (apply range args)))

(def L 256)

(def a (vec-range L))

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

(defn run-round [a i skip ls] (loop [
  a a
  i i
  skip skip
  rem-ls ls
] (if (== 0 (count rem-ls)) [a i skip]
  (let [
    l (first rem-ls)
    rem-ls' (rest rem-ls)
    [a' i' skip'] (run-op a i skip l)
  ] (recur a' i' skip' rem-ls')))))

(def ROUNDS_COUNT 64)

(defn run-full [a ls] (loop [
  a a
  i 0
  skip 0
  rem-rounds ROUNDS_COUNT
]
  (if (== 0 rem-rounds) a
    (let [
      rem-rounds' (dec rem-rounds)
      [a' i' skip'] (run-round a i skip ls)
    ] 
      (recur a' i' skip' rem-rounds')))))

(def sparse-hash (run-full a ls))

(defn xor [a] (reduce bit-xor 0 a))

(def dense-hash (map #(xor (subvec sparse-hash (* % 16) (* (inc %) 16))) (vec-range 16)))

(def to-hex #(format "%02x" %))

(println (s/join "" (into [] (map to-hex dense-hash))))

