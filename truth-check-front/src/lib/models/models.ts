export {}
/*const TYPES = [
  'actor',
  'item',
  'stage',
  'effect',
  'game',
  // token?
] as const

type Type = typeof TYPES[number]

interface ForeignKey<T extends Type = Type> {
  type: T;
  id: string;
}
type Value = string | number | boolean;

interface Resource {
  //Indexing info
  id: string;
  //Maintenance info
  creationDate: Date;
  updateDate: Date;
  documentVersion: number;
  //Resource info
  authorId: string;
  name: string;
  description: string;
  imageURI: string;
  type: Type;
  data: Record<string, Value | ForeignKey | Value[] | ForeignKey[]>
}

export type {
  ForeignKey,
  Resource,
  Value,
  Type
}
*/