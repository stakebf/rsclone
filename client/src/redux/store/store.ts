export interface Store {
  loading: boolean,
  error: any,
  currentUser: any,
  board: {
    id: string,
    title: string,
    userList: any[],
    columns: any[]
  }
}
