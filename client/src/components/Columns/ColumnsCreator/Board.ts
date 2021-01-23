/* export interface Board {
  id?: string,
  title?: string,
  usersList?: any[],
  columns?: any[]
} */

export interface Board {
  board: {
    id?: string,
    title?: string,
    usersList?: any[],
    background?: string, // ! background for board
    columns?: [
      {
        id?: string,
        title?: string,
        // order?: number,
        taskList?: [
          {
            id?: string,
            title?: string,
            description?: string,
            // order?: number,
            userList?: [
              {
                id: string,
                userName: string,
                email: string,
                login: string
              }
            ],
            todos?: {
              title?: string,
              id?: string,
              todo: [
              {
                id?: string,
                title?: string,
                isComplete?: boolean
              }
            ]},
            comments?: [
              {
                id?: string,
                userName?: string,
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
            background?: string,
            date: string // "16/01/2025"
          }
        ]
      }
    ]
  }
}

/* export interface Board {
  id?: string,
  title?: string,
  usersList?: any[],
  columns?: any[]
} */

/* export interface Board {
  board: {
    id?: string,
    title?: string,
    usersList?: any[],
    columns?: [
      {
        id?: string,
        title?: string,
        // order?: number,
        taskList?: [
          {
            id?: string,
            title?: string,
            description?: string,
            // cardOrder?: number,
            userList?: any[],
            todos?: {
              title?: string,
              id?: string,
              todo: [
              {
                id?: string,
                title?: string,
                isComplete?: boolean
              }
            ]},
            commetns?: [
              {
                id?: string,
                userName?: string,
                date?: string,
                message?: string
              }
            ],
            tags?: string[],
            background?: string
          }
        ]
      }
    ]
  }
}
 */



 /* 
  an old version

  export interface Board {
  board: {
    id?: string,
    title?: string,
    usersList?: any[],
    columns?: [
      {
        columnId?: string,
        columnTitle?: string,
        order?: number,
        cards?: [
          {
            cardId?: string,
            cardTitle?: string,
            userId?: string,
            cardDescription?: string,
            cardOrder?: number,
            todo?: [
              {
                todoId?: string,
                todoTitle?: string,
                isComplete?: boolean
              }
            ],
            cardComments?: [
              {
                commentId?: string,
                userName?: string,
                date?: string,
                message?: string
              }
            ],
            tags?: string[],
            background?: string
          }
        ]
      }
    ]
  }
}
 */
