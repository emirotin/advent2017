(ns day14.index2
  (:require
    [clojure.string :as s]
    [day14.hash :refer [knot-hash]]
    [clojure.pprint :refer [cl-format]]))

(def parse-hex #(Integer/parseInt % 16))
(defn left-pad [s len ch] (cl-format nil (str "~" len ",'" ch "d") s))
(def to-bin #(left-pad (Integer/toBinaryString %) 4 "0" ))
(defn split [p s] (s/split s p))

(def digit-to-bits #(to-bin (parse-hex %)))

(def to-map-char #(if (= "1" %) \# \.))

(defn cnct [& as] (into [] (apply concat as)))

(defn vec-range [& args] (into [] (apply range args)))

(defn to-map [s] (->> s
  (split #"")
  (map digit-to-bits)
  (s/join "")
  (split #"")
  (map to-map-char)
  (into [])))

(def INPUT "ljoxqyyw")

(defn build-row [index] 
  (to-map
    (knot-hash 
      (str INPUT "-" index))))

(def SIZE 128)

(def grid (into [] (map build-row (vec-range SIZE))))

(defn read-cell [grid i j] (get (get grid i) j))

(defn filled? [grid [i j]] (= \# (read-cell grid i j)))

(defn find-start [grid]
  (loop [i 0 j 0]
    (cond
      (== i SIZE) nil
      (== j SIZE) (recur (inc i) 0)
      (filled? grid [i j]) [i j]
      :else (recur i (inc j)))))

(defn write-cell [grid [i j] v]
  (let [
    r (get grid i)
    r' (assoc r j v)
  ] (assoc grid i r')))

(defn neighbours [[i j]]
  (let [
    cand [
      [(dec i) j]
      [i (dec j)]
      [i (inc j)]
      [(inc i) j]
    ]
    valid? (fn [[i j]]
      (and (>= i 0) (< i SIZE) (>= j 0) (< j SIZE)))
  ] (filter valid? cand)))

(defn fill-group [grid group-num start-coords]
  (loop [
    grid grid
    start start-coords
    next []
  ] (if-not start grid
      (if-not (filled? grid start)
        (recur grid (first next) (rest next))
        (let [
          grid' (write-cell grid start group-num)
          next' (cnct next (filter #(filled? grid' %) (neighbours start)))
        ] (recur grid' (first next') (rest next')))))))

(defn -main []
  (loop [
    grid grid
    group-num 0
  ] (let [
      start-coords (find-start grid)
    ] (if-not start-coords (println group-num)
        (let [
          group-num' (inc group-num)
          grid' (fill-group grid group-num' start-coords)
        ] (recur grid' group-num'))))))
