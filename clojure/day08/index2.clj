(require '[clojure.string :as s])

(def parse-int #(Integer/parseInt %))

(defn split [p s] (s/split s p))

(defn parse [line]
  (def re #"^(\w+) (inc|dec) (-?\d+) if (\w+) (<|>|<=|>=|==|!=) (-?\d+)$")
  (def m (re-matches re line))
  (if-not m 
    (throw (ex-info "WTF" {:line line}))
    (let [
      [_ name op val cnd-name cnd cnd-val] m
    ] {
      :name name
      :dec (= op "dec")
      :val (parse-int val)
      :cnd-name cnd-name
      :cnd cnd
      :cnd-val (parse-int cnd-val)
    })))

(def ops {
  "<"   <
  "<="  <=
  ">"   >
  ">="  >=
  "=="  ==
  "!="  not=
})

(def data (->> "./input" slurp s/trim-newline s/split-lines (map parse)))

(defn get-val [reg name] (get reg name 0))

(defn update-val [max-val reg name dec val] (let [
  old-val (get-val reg name)
  mul (if dec -1 1)
  new-val (+ old-val (* val mul))
  max-val' (max max-val new-val)
] [(assoc reg name new-val) max-val']))

(defn cond-holds [reg name cnd val]
  (let [
    reg-val (get-val reg name)
    op (get ops cnd)
  ] (if-not op
    (throw (ex-info "WTF unknown cond" {:cnd cnd :name name}))
    (op reg-val val))))

(def max-val (loop [
  registers {}
  rem-data data
  max-val 0
] (if (== 0 (count rem-data)) max-val
  (let [
    d (first rem-data)
    rem-data' (rest rem-data)
    {:keys [name dec val cnd-name cnd cnd-val]} d
    holds (cond-holds registers cnd-name cnd cnd-val)
    [registers' max-val'] (if-not holds [registers max-val] (update-val max-val registers name dec val))
  ] (
    recur registers' rem-data' max-val'
  )))))

(println max-val)