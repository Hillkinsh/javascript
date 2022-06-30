type Includes<T extends unknown[], U> = U extends T[number] ? true : false

type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">; // expected to be `false`
