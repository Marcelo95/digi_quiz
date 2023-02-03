import { NextApiRequest, NextApiResponse } from 'next'
import { questions } from '../../../data'
import type { Questions, ResponseError } from '../../../interfaces'

export default function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Questions> | ResponseError>
) {
  const { query } = req
  const { quizId } = query
  


  // User with id exists
  return questions
    ? res.status(200).json(questions)
    : res.status(404).json({ message: `Error` })
}
