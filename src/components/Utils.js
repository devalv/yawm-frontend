export function generateDarkColorHex() {
  let color = '#';
  for (let i = 0; i < 3; i += 1)
    color += `0${Math.floor((Math.random() * 16 ** 2) / 2).toString(16)}`.slice(
      -2
    );
  return color;
}

export function generateLightColorHex() {
  let color = '#';
  for (let i = 0; i < 3; i += 1)
    color += `0${Math.floor(((1 + Math.random()) * 16 ** 2) / 2).toString(
      16
    )}`.slice(-2);
  return color;
}
