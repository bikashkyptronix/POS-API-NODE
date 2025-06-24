//  Create slug
export const slugCreation = (name) => {
  return name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')   // remove invalid chars
    .replace(/\s+/g, '-')          // collapse whitespace and replace by -
    .replace(/-+/g, '-');          // collapse dashes
};