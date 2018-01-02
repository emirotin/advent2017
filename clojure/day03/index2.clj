(defn ceil [n] (int (Math/ceil n)))
(defn floor [n] (int (Math/floor n)))
(defn abs [n] (int (Math/abs n)))
(defn sq [x] (* x x))
(defn sum [a] (reduce + 0 a))

(defn up-square [n] (ceil (Math/sqrt n)))

(defn get-layer [n] 
  (let [m (up-square n)]
  (ceil (/ (dec m) 2))))

(defn index-to-coords [n]
  (if (> n 1) (
    let [
      l (get-layer n)
      layer-len (* 2 l)
      n' (- n (inc (sq (dec layer-len))))
      side (floor (/ n' layer-len))
      lower (* layer-len side)
      upper (dec (+ lower layer-len))
      mid (/ (dec (+ lower upper)) 2)
    ] (
      case side
        0 [l (- n' mid)]
        2 [(* -1 l) (- mid n')]
        1 [(- mid n'), l]
        3 [(- n' mid), (* -1 l)]
        (throw (ex-info "Impossible side" {:side side}))
    )
  ) [0 0]))


(defn coords-to-index [[x, y]]
  (if-not (and (== x 0) (== y 0)) (
    let [
      abs-x (abs x)
      abs-y (abs y)
    ] (if (>= abs-y abs-x) (
      if (>= y 0) (
        let [
          i (- (sq (inc (* 2 abs-y))) (* 5 abs-y))
        ] (- i x)
      ) (
        let [
          i (- (sq (inc (* 2 abs-y))) abs-y)
        ] (+ i x)
      )
    ) (
      if (>= x 0) (
        let [
          i (+ (sq (dec (* 2 abs-x))) abs-x)
        ] (+ i y)
      ) (
        let [
          i (- (sq (inc (* 2 abs-x))) (* 3 abs-x))
        ] (- i y)
      )
    ))
  ) 1)
)

(def N 277678)

(defn indices [i]
  (let [
    [x, y] (index-to-coords i)
    adjs [
      [(dec x) (dec y)]
      [(dec x) y]
      [(dec x) (inc y)]
      [x, (dec y)]
      [x, (inc y)]
      [(inc x) (dec y)]
      [(inc x) y]
      [(inc x) (inc y)]
    ]
  ] (
    ->> adjs (map coords-to-index) (filter #(< % i)) (into [])
  ))
)

(def res (loop [
  a [nil 1]
  max 1
  i 1
] (if (> max N) max (
  let [
    nextI (inc i)
    newMax (->> (indices nextI) (map #(get a %)) sum)
  ] (recur (conj a newMax) newMax nextI)
))))

(println res)

