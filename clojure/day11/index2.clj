(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))
(defn split [p s] (s/split s p))

(defn map-dir [dir]
  (case dir
    "n"  { :x 1  :y 0  :z -1 }
    "ne" { :x 1  :y -1 :z 0 }
    "nw" { :x 0  :y 1  :z -1 }
    "sw" { :x -1 :y 1  :z 0 }
    "s"  { :x -1 :y 0  :z 1 }
    "se" { :x 0  :y -1 :z 1 }))

(def data (->>
  "./input"
  slurp
  s/trim-newline
  (split #",")
  (map map-dir)))

(defn add-coords [{x1 :x y1 :y z1 :z} {x2 :x y2 :y z2 :z}]
  {:x (+ x1 x2) :y (+ y1 y2) :z (+ z1 z2)})

(def res (loop [
  c {:x 0 :y 0 :z 0}
  m 0
  rem-data data
] (if (== 0 (count rem-data)) m (let [
  c' (first rem-data)
  rem-data' (rest rem-data)
  c'' (add-coords c c')
  {:keys [x y z]} c''
  d (/ (+ (Math/abs x) (Math/abs y) (Math/abs z)) 2)
  m' (max m d)
](recur c'' m' rem-data')))))

(println res)