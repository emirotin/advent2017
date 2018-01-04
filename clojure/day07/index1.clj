(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))
(defn split [p s] (s/split s p))

(defn parse-line [line] (
  let [
    [self ch] (split #"\s*->\s*" line)
    children (if ch (split #"\s*,\s*" ch) [])
    m (re-matches #"(\w+)\s\((\d+)\)" self)
    name (get m 1)
    weight (parse-int (get m 2))
  ] {
    :children children
    :name name
    :weight weight
    :parent nil
  }
))

(def programs (->> "./input"
  slurp
  s/split-lines
  (map parse-line)
  (into [])
))

(def program-by-name (reduce (fn [acc p] (
  assoc acc (:name p) p
)) {} programs))

(defn set-parent [p-name rem-children program-by-name] (
  if (== 0 (count rem-children)) program-by-name (
    let [
      ch (first rem-children)
      rem-children' (rest rem-children)
      ch' (get program-by-name ch)
      ch'' (assoc ch' :parent p-name)
      program-by-name' (assoc program-by-name ch ch'')
    ] (
      recur p-name rem-children' program-by-name'
    )
  )
))

(defn set-parents [rem-programs program-by-name] (
  if (== 0 (count rem-programs)) program-by-name (
    let [
      p-name (first rem-programs)
      p (get program-by-name p-name)
      rem-programs' (rest rem-programs)
      program-by-name' (set-parent p-name (:children p) program-by-name)
    ] (
      recur rem-programs' program-by-name'
    )
  )
))

(def program-by-name' (set-parents (map :name programs) program-by-name))

(defn find-root [p-name program-by-name]
  (let [p (get program-by-name p-name)]
    (if-not (:parent p) p-name (find-root (:parent p) program-by-name))))

(println
  (find-root
    (first (keys program-by-name'))
    program-by-name'))
