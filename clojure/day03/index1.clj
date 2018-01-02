(defn ceil [n] (int (Math/ceil n)))
(defn floor [n] (int (Math/floor n)))

(defn up-square [n] (ceil (Math/sqrt n)))

(defn get-layer [n] 
  (let [m (up-square n)]
  (ceil (/ (dec m) 2))))

(def N 277678)

(defn sq [x] (* x x))

(defn dist [n] 
  (if (> n 1) (
    let [
      l (get-layer n)
      layer-len (* 2 l)
      n' (- n (inc (sq (dec layer-len))))
      lower (* layer-len (floor (/ n' layer-len)))
      upper (dec (+ lower layer-len))
      mid (/ (dec (+ lower upper)) 2)
    ]
      (+ l (Math/abs (- n' mid)))
    
  ) 0))

(println (dist N))
