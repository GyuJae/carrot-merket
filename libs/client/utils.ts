export const classToString = (...classNames: string[]) => {
  return classNames.join(" ");
};

interface IFileToUrl {
  fileId: string;
  variant: "avatar" | "public";
}

export const fileToUrl = ({ fileId, variant }: IFileToUrl): string =>
  `https://imagedelivery.net/ZYLViq3IecpAakTgPse5sg/${fileId}/${variant}`;
