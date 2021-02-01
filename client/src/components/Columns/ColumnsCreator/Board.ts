export interface Board {
  board: {
    id?: string,
    title?: string,
    userList?: any[],
    background?: string,
    columns?: [
      {
        _id?: string,
        title?: string,
        // order?: number,
        taskList?: [
          {
            _id?: string,
            title?: string,
            description?: string,
            // order?: number,
            usersList?: [
              {
                id: string,
                name: string,
              }
            ],
            todos?: [
              {
                title?: string,
                id?: string,
                todo: [
                  {
                    id?: string,
                    title?: string,
                    isComplete?: boolean
                  }
                ],
              }
            ],
            comments?: [
              {
                id?: string,
                userId: string,
                userName: string,
                date?: string,
                message?: string
              }
            ],
            tags?: [
              {
                id?: string,
                color: string
              }
            ],
            date: string
          }
        ]
      }
    ]
  }
}
