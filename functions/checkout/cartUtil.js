import {v4 as uuidv4} from 'uuid'
/**
 * Clear the cart.
 *
 * @param  {Function}                                       clearCartMutation    clearCartMutation function
 * @param  {string}                                         previousRequestError Error from previous request.
 * @return {Promise<{cartCleared: boolean, error: string}>}
 */
export const clearTheCart = async (clearCartMutation) => {
  const response = await clearCartMutation({
    variables: {
      input: {
        clientMutationId: uuidv4(),
        all: true
      }
    }
  })
  return response
}
