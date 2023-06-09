export const getImagePath = (name: string) => {
  const baseUrl = "/assets/";
  let characterName = name.replaceAll(" ", "-").toLowerCase();
  return `${baseUrl}${characterName}.png`;
};
