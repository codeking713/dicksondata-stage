export const parseName = (input) => {
  let fullName = input || ''
  let result = {}

  if (fullName.length > 0) {
    let names = fullName.split(' ')

    if (names.length < 2) {
      result.name = names[0].trim()
      result.lastName = ''
      result.secondLastName = ''
    } else if (names.length > 2) {
      result.name = names[0].split()
      result.lastName = names[names.length - 1].trim()
      result.secondLastName = names.slice(1, -1).join(' ').trim()
    } else {
      result.name = names[0].trim()
      result.lastName = names[names.length - 1].trim()
      result.secondLastName = ''
    }

    // let nameTokens =
    //   fullName.match(
    //     /[A-ZÁ-ÚÑÜ][a-zá-úñü]+|([aeodlsz]+\s+)+[A-ZÁ-ÚÑÜ][a-zá-úñü]+/g
    //   ) || []

    // if (nameTokens.length > 3) {
    //   result.name = nameTokens.slice(0, 2).join(' ')
    // } else {
    //   result.name = nameTokens.slice(0, 1).join(' ')
    // }

    // if (nameTokens.length > 2) {
    //   result.lastName = nameTokens.slice(-2, -1).join(' ')
    //   result.secondLastName = nameTokens.slice(-1).join(' ')
    // } else {
    //   result.lastName = nameTokens.slice(-1).join(' ')
    //   result.secondLastName = ''
    // }
  }

  return result
}

export const validateEmail = (email) => {
  if (email?.endsWith('@test.com')) {
    return false
  }

  const pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

  return pattern.test(email)
}

export const selectOptionsIndustries = [
  {
    text: 'INDUSTRY_AEROSPACE',
    value: 'Aerospace'
  },
  {
    text: 'INDUSTRY_CONSTRUCTION',
    value: 'Construction'
  },
  {
    text: 'INDUSTRY_FOOD',
    value: 'Food'
  },
  {
    text: 'INDUSTRY_GOVERNMENT',
    value: 'Government'
  },
  {
    text: 'INDUSTRY_HOSPITAL_HEALTHCARE',
    value: 'Hospital/Healthcare'
  },
  {
    text: 'INDUSTRY_MANUFACTURING',
    value: 'Manufacturing'
  },
  {
    text: 'INDUSTRY_MEDICAL_DEVICES',
    value: 'Medical Devices'
  },
  {
    text: 'INDUSTRY_PHARMACEUTICAL',
    value: 'Pharmaceutical'
  },
  {
    text: 'INDUSTRY_SERVICES',
    value: 'Services'
  },
  {
    text: 'INDUSTRY_TRANSPORT',
    value: 'Transportation'
  }
]

export const selectOptionsInquiries = [
  {
    text: 'SALES',
    value: 'Sales'
  },
  {
    text: 'INDUSTRY_SERVICES',
    value: 'Services'
  },
  {
    text: 'GENERAL_INQUIRY',
    value: 'General Inquiry'
  }
]
