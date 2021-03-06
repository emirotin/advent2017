(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))

(defn split [p s] (s/split s p))

(defn cnct [& as] (into [] (apply concat as)))

(defn parse [s]
  (let [cmd (first s) payload (subs s 1)]
    (case cmd
      \s [cmd (parse-int payload)]
      \x [cmd (->> payload (split #"/") (map parse-int) (into []))]
      \p [cmd (->> payload (split #"/") (map first) (into []))]
      (throw (ex-info "WTF" {:cmd s})))))

(def input (->>
  "./input"
  slurp
  (split #",")
  (map parse)))

(defn spin [arr x]
  (let [
    L (count arr)
    x' (- L x)
    a1 (subvec arr x')
    a2 (subvec arr 0 x')
  ] (cnct a1 a2)))

(defn swap [arr [x y]]
  (let [
    t (get arr x)
    arr' (assoc arr x (get arr y))
  ] (assoc arr' y t)))

(defn swap-vals [arr [a b]] 
  (let [
    x (.indexOf arr a)
    y (.indexOf arr b)
  ] (swap arr [x y])))

(def arr
  (let [
    L 16
    a (int \a)
    r (range L)
    r' (map #(char (+ a %)) r)
  ] (into [] r')))

(defn run [arr]
  (loop [
    arr arr
    rem-cmd input
  ] (if (== 0 (count rem-cmd)) arr
      (let [
        [cmd payload] (first rem-cmd)
        rem-cmd' (rest rem-cmd)
        op (case cmd
          \s spin
          \x swap
          \p swap-vals)
        arr' (op arr payload)
      ] (recur arr' rem-cmd')))))

(def period-info
  (loop [
    arr arr
    seen {arr 0}
    i 0
  ] (let [
      i' (inc i)
      arr' (run arr)
    ] (if (contains? seen arr')
        [arr' (get seen arr') (- i' (get seen arr'))]
        (recur arr' (assoc seen arr' i') i')))))

(def ITER 1e9)

(def res (let [
    [arr' setup period] period-info
    iter (mod (- ITER setup) period)
  ]
    (loop [
      arr arr'
      i 0
    ] (if (== iter i) arr
        (recur (run arr) (inc i))))))

(println (s/join "" res))