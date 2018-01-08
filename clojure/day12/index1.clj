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

(def res (loop [
  group #{}
  next []
  current (get data 0)
] (if-not current (count group) 
    (let [
      {p :p c :c} current
      group' (conj group p)
      c' (filter #(not (contains? group %)) c)
      next' (cnct next c')
      id (first next')
      next'' (rest next')
      current' (if-not id nil (get data id))
    ] (recur group' next'' current')))))

(println res)