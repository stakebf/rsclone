export interface Store {
  loading: boolean,
  error: any,
  board: {
    id: string,
    title: string,
    usersList: any[],
    columns: any[]
  }
}
