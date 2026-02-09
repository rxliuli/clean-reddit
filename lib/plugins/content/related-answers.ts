import { BasePlugin } from '../type'

export function relatedAnswers(): BasePlugin {
  return {
    name: 'related-answers',
    description: 'Related Answers section',
    selectors: ['#answers-suggested-queries-m3'],
  }
}
