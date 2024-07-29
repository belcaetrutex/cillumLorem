/**
 * Modifies the given data array by adding 1 to each element.
 * @param {number[]} data - The array to be modified
 * @return {number[]} - The modified data array
 */
function modifyDataArray(data) {
  for (let i = 0; i < data.length; i++) {
    data[i] += 1;
  }
  return data;
}
