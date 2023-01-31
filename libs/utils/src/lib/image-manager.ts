export class ImageManager {
  static setImg(files: File[], fn: (reader: FileReader) => () => void): void {
    if (files[0].type.match(/image\/*/) === null || files.length === 0) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = fn(reader);
  }

  static setUrl(data: string): string {
    const arrData = data.split('\\');
    return arrData[arrData.length - 1];
  }
}
