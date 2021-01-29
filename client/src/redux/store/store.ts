export interface Store {
  loading: boolean,
  error: any,
  board: {
    id: string,
    title: string,
    currentUser: any,
    userList: any[],
    columns: any[]
  }
}
