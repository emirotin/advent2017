(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))
(defn split [p s] (s/split s p))
(defn cnct [& as] (into [] (apply concat as)))

(def input (->>
  "./input"
  slurp
  s/trim-newline
  s/split-lines))

(defn parse-line [line] 
  (let [
    [p ps] (s/split line #"\s*<->\s*")
  ] {
      :p (parse-int p) 
      :c (->> ps (split #"\s*,\s*") (map parse-int))
    }))

(def data (into [] (map parse-line input)))

(def data-by-id (reduce (fn [acc d] (assoc acc (:p d) d)) {} data))

(defn find-group [data-by-id]
  (if (== 0 (count data-by-id)) [false data-by-id]
    (loop [
      data-by-id data-by-id 
      group #{}
      next []
      current-id (first (keys data-by-id))
    ] (if-not current-id [true data-by-id]
      (let [
        {c :c} (get data-by-id current-id)
        data-by-id' (dissoc data-by-id current-id)
        group' (conj group current-id)
        c' (filter #(not (contains? group %)) c)
        next' (cnct next c')
        current-id' (first next')
        next'' (rest next')
      ] (recur data-by-id' group' next'' current-id'))))))

(def res (loop [
  groups 0
  data-by-id data-by-id
] (let [
  [found data-by-id'] (find-group data-by-id)
] (if-not found groups
  (recur (inc groups) data-by-id')))))

(println res)
