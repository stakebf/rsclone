export interface Board {
  id?: string,
  title?: string,
  usersList?: any[],
  columns?: any[]
}

/* export interface Board {
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
          cartDescription?: string,
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
} */
