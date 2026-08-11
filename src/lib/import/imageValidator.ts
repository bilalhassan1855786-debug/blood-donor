import {
  MAX_IMAGE_SIZE,
} from "./constants";

export function validateImage(
  file: File
) {

  if (
    !file.type.startsWith(
      "image/"
    )
  ) {
    throw new Error(
      "Only image files are allowed."
    );
  }

  if (
    file.size >
    MAX_IMAGE_SIZE
  ) {
    throw new Error(
      "Image size must be less than 5MB."
    );
  }

  return true;

}