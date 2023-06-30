export const slugify = (slug) => {
  return slug
    .toLowerCase()
    .replaceAll("'", "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ", "-");
};

export const unslugify = (slug) => {
  return slug.replaceAll("-", " ");
};
