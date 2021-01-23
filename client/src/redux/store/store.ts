export interface Store {
  loading: boolean,
  error: any,
  board: {
    id: string,
    title: string,
    currentUser: any,
    usersList: any[],
    columns: any[]
  }
}
