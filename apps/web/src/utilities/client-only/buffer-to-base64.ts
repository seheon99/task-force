export function bufferToBase64(input: ArrayBuffer | ArrayBufferView): string {
  const uint8 = ArrayBuffer.isView(input)
    ? new Uint8Array(input.buffer, input.byteOffset, input.byteLength)
    : new Uint8Array(input);

  const binary = String.fromCharCode(...uint8);
  return btoa(binary);
}
