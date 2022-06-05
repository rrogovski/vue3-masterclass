export const findById = (resources, id) => resources.find(curr => curr.id === id)

export const upsert = (resources, resourece) => {
  const index = resources.findIndex(curr => curr.id === resourece.id)

  if (resourece.id && index !== -1) {
    resources[index] = resourece
  } else {
    resources.push(resourece)
  }
}
