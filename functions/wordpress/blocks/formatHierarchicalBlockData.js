/**
 * Get formatted hierarchical block object.
 *
 * @author DAP
 * @param  {object} data Data that needs to be formatted.
 * @return {object}      The formatted object.
 */
export default function formatHierarchicalBlockData(data) {
  let objectArray = new Array()
  for (const [key, value] of Object.entries(data)) {
    if (!key.startsWith('_')) {
      const singleItemArray = key.split('_')
      let index = singleItemArray[1]
      let fieldName = singleItemArray[2]
      var jsonData = {}
      if (fieldName) {
        if (!objectArray[index]) {
          //Parent index not exists on array already, hence we create one
          jsonData[fieldName] = value
        } else {
          //Parent index exists on array already, hence re-use it
          jsonData = objectArray[index]
        }

        if (singleItemArray.length === 3) {
          jsonData[fieldName] = value
          objectArray[index] = jsonData
        }

        if (singleItemArray.length === 5) {
          fieldName += 'ChildNode'
          jsonData[fieldName] = appendToChildArray(
            jsonData[fieldName],
            singleItemArray,
            value
          )
          objectArray[index] = jsonData
        }

        if (singleItemArray.length === 7 && jsonData[fieldName + 'ChildNode']) {
          jsonData[fieldName] = appendNestedToChildArray(
            jsonData[fieldName + 'ChildNode'][singleItemArray[3]],
            singleItemArray,
            value
          )
          objectArray[index] = jsonData
        }
      }
    }
  }
  return objectArray
}

/**
 * @param  {Array}  existingNode Existing node array.
 * @param  {Array}  dataArray    Field Data that needs to be formatted.
 * @param  {string} value        Data value.
 * @return {Array}               The formatted array.
 */
function appendToChildArray(existingNode, dataArray, value) {
  if (!existingNode) {
    existingNode = new Array()
  }

  let index = dataArray[3]
  let fieldName = dataArray[4]
  var jsonData = {}
  if (fieldName != undefined) {
    if (existingNode[index] == undefined) {
      jsonData[fieldName] = value
      existingNode.push(jsonData)
    } else {
      jsonData = existingNode[index]
      jsonData[fieldName] = value
      existingNode[index] = jsonData
    }
  }

  return existingNode
}

/**
 * @param  {Array}  existingNode Existing node array.
 * @param  {Array}  dataArray    Field Data that needs to be formatted.
 * @param  {string} value        Data value.
 * @return {Array}               The formatted array.
 */
function appendNestedToChildArray(existingNode, dataArray, value) {
  let nestedChild = dataArray[4] + 'ChildNode'
  let index = dataArray[5]
  let fieldName = dataArray[6]
  let newNode = new Array()

  if (existingNode) {
    newNode = existingNode[nestedChild]
  }
  if (!newNode) {
    newNode = []
  }
  newNode[index] = {
    ...newNode[index],
    [fieldName]: value
  }
  if (existingNode) {
    existingNode[nestedChild] = newNode
  }
  return newNode
}
