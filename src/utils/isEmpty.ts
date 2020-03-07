export const isEmpty = (value: any) => {
  if (value == null) {
    return true
  }

  for (let prop in value) {
    if (value.hasOwnProperty(prop)) {
      return false
    }
  }

  return true
}
