export function declOfNum(n, text_arr) {
  n = Math.abs(n) % 100;
  let n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_arr[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_arr[1];
  }
  if (n1 === 1) {
    return text_arr[0];
  }
  return text_arr[2];
}

export function declOfComments(num) {
  return declOfNum(num, ['Комментарий', 'Комментария', 'Комментариев']);
}