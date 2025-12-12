import { fromBlob } from "image-resize-compress";

const converter = async (blob: Blob, width: number | "auto" = "auto"): Promise<Blob> => {
  const quality = 800;
  const height = 'auto';
  const format = "webp";
  const resizedImage = await fromBlob(blob, width, height, quality, format);
  return resizedImage;
};

export default converter;
