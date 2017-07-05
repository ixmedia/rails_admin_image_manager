export function encodeImageFileAsURL(element) {
  return new Promise((resolve, reject) => {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      resolve(reader.result)
    }
    reader.readAsDataURL(file);
  })
}
