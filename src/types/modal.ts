export type ModalOptions = {
  showCloseButton?: boolean;
  className?: string | string[];
};

export interface IModalData {
  title?: string;
  content?: string | JSX.Element;
  options?: ModalOptions;
}
