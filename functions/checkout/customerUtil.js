import {v4} from 'uuid'
/**
 * Returns customer data in the required format.
 *
 * @param {string} data customer data
 */

/**
 * @param  {object} data Formatted customer object
 * @return {string}      generated field id.
 */
export const getFormattedCustomer = (data) => {
  const uid = v4()

  const formattedCustomer = {
    clientMutationId: uid,
    email: data.email,
    billing: {
      email: data.email
    }
  }

  return formattedCustomer
}

export const updateTheCustomer = async (
  updateCustomerMutation,
  customerData
) => {
  let response = {
    data: null,
    error: ''
  }

  try {
    const {data} = await updateCustomerMutation({
      variables: {
        input: customerData
      }
    })

    response.data = data
  } catch (err) {
    alert('updateCustomer Error Occured - check console')
    console.error(err)
    response.error = err.message
  }

  return response
}
