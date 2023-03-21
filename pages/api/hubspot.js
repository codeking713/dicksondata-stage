import axios from 'axios'

/**
 * Hubspot Form Submission
 *
 * @author DAP
 * @param  {object} req Instance of http.IncomingMessage.
 * @param  {object} res Instance of http.ServerResponse.
 * @return {object}     Sends data to Hubspot
 */
export default async function sendLead(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({message: 'Request type is not allowed.'})
    return
  }
  const body = JSON.parse(JSON.stringify(req.body))
  const portalId = '5565834'
  let formGuid = ''
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const remoteAddress =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress || null

  switch (body.formType) {
    case 'Contact':
      formGuid = 'b188e582-f29a-49ed-95cc-82f4dcf7935b'
      break
    case 'Newsletter':
      formGuid = 'd85d6255-51e6-4ab3-9471-080f7cee12e5'
      break
  }

  try {
    await axios
      .post(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
        {
          portalId,
          formGuid,
          fields: body.formData,
          context: {
            ...body.contextData,
            ipAddress: remoteAddress,
            hutk: req.cookies['hubspotutk']
          }
        },
        config
      )
      .then(({data}) => {
        res.status(200).json({
          status: 'complete',
          data
        })
      })
      .catch(({err}) => {
        res.status(400).json({
          status: 'error',
          err
        })
      })
  } catch (e) {
    res.status(400).json({error: e.message})
  }
}
