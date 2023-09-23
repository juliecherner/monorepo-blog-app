export type Post = {
  _id?: string;
  title: string;
  text: string;
};

export enum PostAction {
  CREATE = "CREATE",
  EDIT = "EDIT",
  DELETE = "DELETE",
}
