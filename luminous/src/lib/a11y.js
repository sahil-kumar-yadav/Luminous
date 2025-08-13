export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function srOnly() {
  return 'sr-only';
}