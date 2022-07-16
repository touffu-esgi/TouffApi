export function filterByProp(
  object: {},
  propName: string,
  filterValue: string,
  lc = false,
): boolean {
  if (lc) {
    return (
      !object[propName] ||
      object[propName].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
    );
  }
  return !object[propName] || object[propName].indexOf(filterValue) !== -1;
}
