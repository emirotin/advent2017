(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))
(defn split [p s] (s/split s p))

; parse data

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

; find root, calc total weights, and build tree

(def root
  (find-root
    (first (keys program-by-name'))
    program-by-name'))

(def sum #(reduce + 0 %))

(declare calc-weights)

(defn calc-weights* [rem-ps program-by-name]
  (if (== 0 (count rem-ps)) program-by-name
    (let [
      p-name (first rem-ps)
      rem-ps' (rest rem-ps)
      program-by-name' (calc-weights p-name program-by-name)
    ] (calc-weights* rem-ps' program-by-name'))))

(defn calc-weights [p-name program-by-name]
  (let [
    p (get program-by-name p-name)
    program-by-name' (calc-weights* (:children p) program-by-name)
    total-weight (+ (:weight p) (->> p
      :children
      (map #(get program-by-name' %))
      (map :total-weight)
      sum))
    p' (assoc p :total-weight total-weight)
    program-by-name'' (assoc program-by-name' p-name p')
  ] program-by-name''))

(def tree {
  :program-by-name (calc-weights root program-by-name')
  :root root })

; find unbalanced node

(defn collect-weights [p-name program-by-name]
  (let [
    p (get program-by-name p-name)
    ch (->> p :children (map #(get program-by-name %)))
    by-weight (group-by :total-weight ch)
    weights (keys by-weight)
    cnt (count weights)
  ] (cond
      (> cnt 2) (throw (ex-info "Too many different weights" {:p p-name, :weights weights}))
      (== 1 cnt) {:good (first weights)}
      :else (let [
        [frst scnd] weights
        first-name #(:name (first (get by-weight %)))
      ] (
        if (== 1 (count (get weights frst)))
          {:good scnd :bad frst :bad-program (first-name frst)}
          {:good frst :bad scnd :bad-program (first-name scnd)}
      ))
    )))

(defn find-unbalanced [p-name program-by-name] (
  let [
    w (collect-weights p-name program-by-name)
    bp (:bad-program w)
  ] (if-not bp nil (
    let [w' (find-unbalanced bp program-by-name)] (or w' w)
  ))
))

; find the wrong node, and calculate the adjustment diff
; finally compute the ideal weight

(def res (let [
  {:keys [good bad bad-program]} (find-unbalanced (:root tree) (:program-by-name tree))
  bp (get (:program-by-name tree) bad-program)
  bw (:weight bp)
  diff (- good bad)
] (+ bw diff)))

(println res)
