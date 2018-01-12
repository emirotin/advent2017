(def STEP 316)
(def MAX 2017)

(defn cnct [& as] (into [] (apply concat as)))

(defn safe-subvec
  ([a i] (let [l (count a) i' (max i 0) i'' (min i' l)] (subvec a i'')))
  ([a i j] (let [l (count a) i' (max i 0) i'' (min i' l) j' (max j 0) j'' (min j' l)] (subvec a i'' j''))))

(defn splice [a i v]
  (let [
    a1 (safe-subvec a 0 (inc i))
    a2 (safe-subvec a (inc i))
  ] (cnct a1 [v] a2)))

(def res (loop [
  a [0]
  i 0
  v 1
] (if (> v MAX) (get a (+ i 2)) (let [
  i' (inc (mod (+ i STEP) v))
  a' (splice a i' v)
] (recur a' i' (inc v))))))

(println res)

