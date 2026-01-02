import { fromBlob } from "image-resize-compress";

const converter = async (blob: Blob, width: number | "auto" = "auto"): Promise<Blob> => {
  const quality = 80;
  const height = 'auto';
  const format = "webp";
  const resizedImage = await fromBlob(blob, quality, width, height,format);
  return resizedImage;
};

export default converter;