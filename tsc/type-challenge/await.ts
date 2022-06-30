type b = Promise<string>;

type Awaite<T extends Promise<unknown> > = T extends Promise<infer R> ? R : never
const cc: Awaite<b> = "";
