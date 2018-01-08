(ns day14.index1
  (:require
    [clojure.string :as s]
    [day14.hash :refer [knot-hash]]
    [clojure.pprint :refer [cl-format]]))

(def parse-hex #(Integer/parseInt % 16))
(defn left-pad [s len ch] (cl-format nil (str "~" len ",'" ch "d") s))
(def to-bin #(left-pad (Integer/toBinaryString %) 4 "0" ))
(defn split [p s] (s/split s p))

(def digit-to-bits #(to-bin (parse-hex %)))

(def to-bin-digit #(if (= "1" %) 1 0))

(def sum #(reduce + 0 %))

(defn to-bits [s] (->> s
  (split #"")
  (map digit-to-bits)
  (s/join "")
  (split #"")
  (map to-bin-digit)))

(def INPUT "ljoxqyyw")

(defn cnt [index] (let [
  input (str INPUT "-" index)
  bits (to-bits (knot-hash input))
] (sum bits)))

(defn -main []
  (let [
    r (range 128)
    res (sum (map cnt r))
  ] (println res)))
