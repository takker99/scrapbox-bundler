export function toDataURL(text: string, type = "text/plain") {
  const blob = new Blob([text], { type });
  return BlobToURI(blob);
}
function BlobToURI(blob: Blob) {
  const fileReader = new FileReader();
  const promise = new Promise<string>((resolve, reject) => {
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = (e) => reject(e);
  });
  fileReader.readAsDataURL(blob);
  return promise;
}
