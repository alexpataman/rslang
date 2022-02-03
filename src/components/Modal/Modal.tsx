import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from '@mui/material';
import classNames from 'classnames';

type ModalOptions = {
  showCloseButton?: boolean;
  className?: string | string[];
};

export interface IModalData {
  title?: string;
  content?: string;
  options?: ModalOptions;
}
interface SimpleDialogProps {
  open: boolean;
  modalData: IModalData;
  onClose: () => void;
}

export const Modal = (props: SimpleDialogProps) => {
  const { onClose, open, modalData } = props;
  const { title, content, options } = modalData;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className={classNames(options?.className)}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
      )}
      {options?.showCloseButton && (
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
