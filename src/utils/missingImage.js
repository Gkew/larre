// Replace missing images with images from unsplash
export function missingImage(event, productName) {
  let imageTag = event.target;
  let productNameShort = productName.split(" -")[0];

  imageTag.src =
    "https://source.unsplash.com/random/1000×600/?" + productNameShort;
}
