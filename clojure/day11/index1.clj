(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))
(defn split [p s] (s/split s p))

; Kudos https://www.redblobgames.com/grids/hexagons/#coordinates

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

(def c (reduce add-coords {:x 0 :y 0 :z 0} data))

(def res (let [
  {:keys [x y z]} c
] (/ (+ (Math/abs x) (Math/abs y) (Math/abs z)) 2)))

(println res)

; console.log((Math.abs(c.x) + Math.abs(c.y) + Math.abs(c.z)) / 2);
