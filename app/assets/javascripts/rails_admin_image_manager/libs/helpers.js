import moment from 'moment'

export function encodeImageFileAsURL(element) {
  return new Promise((resolve, reject) => {
    var file = element.files[0];
    var reader = new FileReader();
    reader.fileName = file.name
    reader.onloadend = function() {
      resolve({src: reader.result, name: reader.fileName})
    }
    reader.readAsDataURL(file);
  })
}
